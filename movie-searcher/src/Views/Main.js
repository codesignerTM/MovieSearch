import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import * as actions from "../actions/imdb.actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import RenderItem from "../Components/renderItem/RenderItem";

const styles = theme => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  searchButton: {
    marginTop: theme.spacing(4)
  },
  logout: {
    color: "#fff"
  },
  spinnerCont: {
    display: "flex",
    justifyContent: "center",
    margin: " 20px"
  },
  ul: {
    listStyleType: "none"
  }
});

class Main extends Component {
  state = {
    logout: false,
    searchTerm: "",
    count: "",
    foundMovies: [],
    dialogTitle: "",
    loading: false,
    openDialog: false,
    checkMovie: false,
    selectedMovie: {}
  };

  signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    this.setState({
      logout: true
    });
  };

  handleChange = input => e => {
    let targetValue = e.target.value;
    this.setState({
      [input]: targetValue
    });
  };

  search = () => {
    let searchTerm = this.state.searchTerm;
    this.setState({
      loading: true
    });
    actions
      .imdbSearch(searchTerm)
      .then(response => {
        this.setState({
          loading: false,
          count: response.data.totalResults,
          foundMovies: response.data.Search
        });
        this.renderList();
      })
      .catch(error => {
        console.log("Error!", error);
      });
  };

  chooseMovie = movie => {
    this.setState({
      selectedMovie: movie,
      checkMovie: true
    });
  };

  renderList() {
    this.setState({
      openDialog: true
    });
  }

  handleClose = () => {
    this.setState({
      openDialog: false
    });
  };

  render() {
    const { classes } = this.props;
    const {
      logout,
      foundMovies,
      loading,
      openDialog,
      totalResults,
      checkMovie,
      selectedMovie
    } = this.state;
    let movieList;

    if (openDialog) {
      movieList = (
        <Dialog
          aria-labelledby="responsive-dialog-title"
          open={openDialog}
          onClose={this.handleClose}
        >
          <DialogTitle id="responsive-dialog-title">
            Search Result: {totalResults}
          </DialogTitle>
          <DialogContent className={classes.ul}>
            {foundMovies.map(movie => {
              return (
                <RenderItem
                  key={movie.imdbID}
                  movieName={movie.Title}
                  year={movie.Year}
                  type={movie.Type}
                  onClick={this.chooseMovie.bind(this, movie)}
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button color="primary" autoFocus onClick={this.handleClose}>
              Bezárás
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return (
      <React.Fragment>
        <AppBar position="relative">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h6" color="inherit" noWrap>
              Movie Search
            </Typography>
            <Typography variant="h6" color="inherit" noWrap>
              <Button className={classes.logout} onClick={this.signOut}>
                Logout
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.content}>
            {checkMovie === true ? (
              <Redirect
                to={{
                  pathname: "/moviedetail",
                  state: { selectedMovie: selectedMovie }
                }}
              />
            ) : null}
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Movie Search!
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Your best friend during pandemic events! Just type the movie
                title in the search field and get the info you want! Official
                Netflix and IMDB partner!
              </Typography>
              <div className={classes.searchButton}>
                <Grid container spacing={2} justify="center">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="searchTerm"
                    label="Search Term"
                    autoFocus
                    onChange={this.handleChange("searchTerm")}
                  />

                  <Grid item>
                    <div className={classes.spinnerCont}>
                      {loading ? <CircularProgress color="secodary" /> : null}
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.search}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
        {logout === true ? <Redirect to="/logout" /> : null}
        {movieList}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Main);
