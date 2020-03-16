import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.scss";

import SignIn from "./Views/SignIn";
import SignUp from "./Views/SignUp";
import Main from "./Views/Main";

class App extends Component {
  state = {
    isSignedIn: false
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/main" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isSignedIn) {
      routes = (
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/main" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <div>{routes}</div>;
  }
}

export default withRouter(App);
