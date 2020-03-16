import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },

  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  }
});

class Logout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container component="main" className={classes.main}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            className={classes.content}
          >
            Thanks for using our service! Happy watching!
          </Typography>
        </Grid>
      </>
    );
  }
}
export default withStyles(styles)(Logout);
