import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../actions/auth.actions";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  warning: {
    color: "red",
    paddingLeft: "10px"
  },
  spinnerCont: {
    display: "flex",
    justifyContent: "center",
    margin: " 20px"
  }
});

class SignUp extends Component {
  state = {
    form: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    emailWarning: false,
    passwordWarning: false,
    firstNameWarning: false,
    lastNameWarning: false,
    redirectToMain: false,
    loading: false
  };

  validation = () => {
    let form = this.state.form;
    if (form.email.length === 0) {
      this.setState({
        emailWarning: true
      });
    } else if (form.password.length === 0) {
      return this.setState({
        emailWarning: false,
        passwordWarning: true
      });
    } else if (form.firstName.length === 0) {
      return this.setState({
        emailWarning: false,
        passwordWarning: false,
        firstNameWarning: true
      });
    } else if (form.lastName.length === 0) {
      return this.setState({
        emailWarning: false,
        passwordWarning: false,
        firstNameWarning: false,
        lastNameWarning: true
      });
    } else {
      return true;
    }
  };

  signUp = () => {
    let form = this.state.form;
    let isValid = this.validation();
    if (!isValid) {
      return;
    }
    this.setState({
      loading: true
    });
    let signUp = true;
    actions
      .Authenticate(
        form.email,
        form.password,
        form.firstName + form.lastName,
        signUp
      )
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("email", form.email);
        this.setState({
          redirectToMain: true,
          loading: false
        });
      })
      .catch(error => {
        console.log("Error while authenticate!", error);
        if (error.code === 400) {
          alert("Email exists!");
        }
        alert("Something faild, try again later!");
      });
  };

  handleChange = input => e => {
    let targetValue = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        [input]: targetValue
      }
    });
  };

  render() {
    const { classes } = this.props;
    const {
      redirectToMain,
      emailWarning,
      passwordWarning,
      firstNameWarning,
      lastNameWarning,
      loading
    } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleChange("firstName")}
                />
              </Grid>
              {firstNameWarning === true ? (
                <span className={classes.warning}>
                  Please type your first name!
                </span>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoFocus
                  value={this.state.form.lastName}
                  onChange={this.handleChange("lastName")}
                />
                {lastNameWarning === true ? (
                  <span className={classes.warning}>
                    Please type your second name!
                  </span>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={this.handleChange("email")}
                />
                {emailWarning === true ? (
                  <span className={classes.warning}>
                    Please type your email address!
                  </span>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={this.handleChange("password")}
                />
                {passwordWarning === true ? (
                  <span className={classes.warning}>
                    Please type a strong password! It should contain uppercase
                    letter, number and symbol!
                  </span>
                ) : null}
              </Grid>
            </Grid>
            <div className={classes.spinnerCont}>
              {loading ? <CircularProgress color="secodary" /> : null}
            </div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.signUp}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {redirectToMain === true ? <Redirect to="/main" /> : null}
      </Container>
    );
  }
}

export default withStyles(styles)(SignUp);
