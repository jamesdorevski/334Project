import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AccountService from "../api/AccountService";

class SignUpComponent extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit = () => {
    AccountService.createUser("tourist", "Andrea", "Burazor", "aburazor@gmail.com", "5551114444", [])
    .then(() => { this.props.history.push("/home") })
  }

  render() {
    //this will be a Formik form with validation
    return (
      <>
        <h1>SIGN UP</h1>
        <div>
          <Button variant="primary" onClick={this.onSubmit}>Sign Up</Button>
        </div>
      </>
    );
  }
}

export default SignUpComponent;
