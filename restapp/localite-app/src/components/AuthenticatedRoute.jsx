import React, { Component } from "react"
import AccountService from "../api/AccountService"
import { Route, Redirect } from "react-router-dom"

class AuthenticatedRoute extends Component {
  render() {
    if (AccountService.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default AuthenticatedRoute;
