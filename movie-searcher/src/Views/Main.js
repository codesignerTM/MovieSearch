import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import Link from "@material-ui/core/Link";
import { Redirect } from "react-router-dom";

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
  }
});

class Main extends Component {
  state = {
    logout: false
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

  render() {
    const { classes } = this.props;
    const { logout } = this.state;
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
                  <Grid item>
                    <Input />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Search
                    </Button>
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
export default withStyles(styles)(Main);
