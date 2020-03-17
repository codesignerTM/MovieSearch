import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.scss";

import SignIn from "./Views/SignIn";
import SignUp from "./Views/SignUp";
import Logout from "./Views/Logout";
import Main from "./Views/Main";
import MovieDetail from "./Views/MovieDetail";

class App extends Component {
  state = {
    isSignedIn: false
  };

  componentDidMount() {
    let email = localStorage.getItem("email");
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    if (email && token && userId) {
      this.setState({
        isSignedIn: true
      });
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isSignedIn) {
      routes = (
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/main" exact component={Main} />
          <Route path="/moviedetail" exact component={MovieDetail} />
          <Route path="/logout" exact component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <div>{routes}</div>;
  }
}

export default withRouter(App);
