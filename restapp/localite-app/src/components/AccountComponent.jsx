import React, { Component } from "react";
import AccountService from "../api/AccountService.js";
import { Figure, Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class AccountComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      success: false,
    };
  }

  componentDidMount = () => {};

  confirmDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Confirm Account Deletion</h1>
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <Button style={{ margin: "5px" }} onClick={this.deleteAccount}>
              Yes!
            </Button>
            <Button
              variant="secondary"
              style={{ margin: "5px" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        );
      },
    });
  };

  deleteAccount = () => {
    let id = AccountService.getCurrentUser()._id;
    AccountService.deleteUser(id).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.props.history.push('/')
          AccountService.logout();
          this.setState({
            message: response.data.message,
            success: true,
          });
        } else {
          this.setState({
            success: false,
            message: "Unable to delete account: " + response.data.message,
          });
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          success: false,
          message: resMessage,
        });
      }
    );
  };

  render() {
    const user = AccountService.getCurrentUser();
    return (
      <>
        {this.state.message && (
          <div className="form-group">
            <div
              className={
                this.state.success
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {this.state.message}
            </div>
          </div>
        )}
        <section className="py-1">
          <div
            style={{ textAlign: "left", padding: "10px" }}
            className="container"
            background-color="transparent"
          >
            <h3 style={{ paddingBottom: "20px" }}>Personal Info</h3>
            <Figure.Image
              roundedCircle
              fluid
              width={150}
              height={150}
              src={require("../images/profile.jpg")}
            />

            <h5>Full Name</h5>
            <p>
              {user.firstName} {user.lastName}
            </p>

            <h5>Gender</h5>
            <p>{user.gender}</p>

            <h5>Email Address</h5>
            <p>{user.email}</p>

            <h5>Phone Number</h5>
            <p>{user.phoneNumber}</p>

            <h5>Languages Spoken</h5>
            <p>{user.languagesSpoken.join(", ")}</p>

            <Button style={{ margin: "5px" }} onClick={() => this.props.history.push(`/account/update`)}>Update Account Info</Button>
            <Button
              variant="danger"
              style={{ margin: "5px" }}
              onClick={this.confirmDelete}
            >
              Delete Account
            </Button>
          </div>
        </section>
      </>
    );
  }
}

export default AccountComponent;
