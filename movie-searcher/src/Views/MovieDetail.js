import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import * as actions from "../actions/wiki.actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  movieContent: {
    height: "70vh",
    margin: "auto"
  },
  logout: {
    color: "#fff"
  },
  spinnerCont: {
    display: "flex",
    justifyContent: "center",
    margin: " 20px"
  },
  posterContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btnCont: {
    width: "100%",
    display: "flex",
    aligItems: "center",
    justifyContent: "center"
  },
  btn: {
    margin: "5px"
  }
});

class MovieDetail extends Component {
  state = {
    logout: false,
    loading: false,
    selectedMovie: {}
  };

  componentDidMount() {
    let selectedMovie = this.props.location.state.selectedMovie;
    this.setState({
      selectedMovie: selectedMovie
    });
  }

  signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    this.setState({
      logout: true
    });
  };

  searchOnWiki = () => {
    let { selectedMovie } = this.state;
    this.setState({
      loading: true
    });
    actions
      .wikiSnippetSearch(selectedMovie.Title)
      .then(response => {
        this.setState({
          loading: false,
          snippet: response.data.query.search[0].snippet
        });
        this.getWikiUrl();
      })
      .catch(error => {
        console.log("Error!", error);
      });
  };

  getWikiUrl = () => {
    let { selectedMovie } = this.state;
    this.setState({
      loading: true
    });
    actions
      .wikiPageSearch(selectedMovie.Title)
      .then(response => {
        console.log("wiki", response);
        this.setState({
          loading: false,
          wikiUrl: response.data[3]
        });
      })
      .catch(error => {
        console.log("Error!", error);
      });
  };

  render() {
    const { classes } = this.props;
    const { logout, selectedMovie, loading, snippet, wikiUrl } = this.state;
    let gotSnippet;
    if (snippet) {
      gotSnippet = (
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Wiki snippet: {snippet}
        </Typography>
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
            <Container>
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
              <div className={classes.movieContent}>
                <Grid container spacing={2} justify="center">
                  <Grid>
                    <div className={classes.spinnerCont}>
                      {loading ? <CircularProgress color="secodary" /> : null}
                    </div>
                    <Typography
                      variant="h5"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      Choosen movie details:
                    </Typography>
                    <Typography
                      variant="h6"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      Title: {selectedMovie.Title}
                    </Typography>
                    <Typography
                      variant="h6"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      Year: {selectedMovie.Year}
                    </Typography>
                    <Typography
                      variant="h6"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      Type: {selectedMovie.Type}
                    </Typography>
                    {gotSnippet}
                    <div className={classes.posterContainer}>
                      <img src={selectedMovie.Poster} alt="Movie poster" />
                    </div>
                    <div className={classes.btnCont}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.searchOnWiki}
                        className={classes.btn}
                      >
                        Find Summary on Wikipedia
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.navigateToWiki}
                        className={classes.btn}
                        disabled={wikiUrl ? false : true}
                      >
                        {wikiUrl ? (
                          <a
                            href={wikiUrl[0]}
                            target="_blank"
                            style={{ color: "#fff", textDecoration: "none" }}
                          >
                            Check on Wikipedia
                          </a>
                        ) : (
                          "Check on Wikipedia"
                        )}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
        {logout === true ? <Redirect to="/logout" /> : null}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(MovieDetail);
