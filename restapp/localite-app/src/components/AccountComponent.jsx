import React, { Component } from "react";
import AccountService from "../api/AccountService.js"
import { Figure, Button } from "react-bootstrap"

class AccountComponent extends Component {
    
  componentDidMount = () => {
  };

  render() {
    const user = AccountService.getCurrentUser();
    return (
      <>
      <section className="py-1">
          <div
            style={{ textAlign: "left", padding: "10px" }}
            className="container"
            background-color="transparent"
          >
            <h3 style={{paddingBottom: "20px"}}>Personal Info</h3>
            <Figure.Image
                  roundedCircle
                  fluid
                  width={150}
                  height={150}
                  src={require("../images/profile.jpg")}
                />

        <h5>Full Name</h5>
        <p>{user.firstName} {user.lastName}</p>

        <h5>Gender</h5>
        <p>Female</p>

        <h5>Email Address</h5>
        <p>{user.email}</p>

        <h5>Phone Number</h5>
        <p>{user.phoneNumber}</p>

        <h5>Languages Spoken</h5>
        <p>{user.languagesSpoken}</p>

        <Button>Update Account Info</Button>
          </div>
          </section>
        
          
      </>
    );
  }
}

export default AccountComponent;