import React, { Component } from "react";
import { Modal, Button, Dropdown, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import logo from "../images/localite.png";
import profile from "../images/profile.jpg";
import LoginModalComponent from "./LoginModalComponent";
import AccountService from "../api/AccountService";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      user: null,
    };
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleShow = () => {
    this.setState({ modalOpen: true });
  };

  signUpClicked = () => {
    this.setState({ modalOpen: false });
  };

  loginSuccess = () => {
    this.props.history.push("/")
    this.setState({ modalOpen: false });
  }

  render() {
    const isUserLoggedIn = AccountService.isUserLoggedIn();
    const user = AccountService.getCurrentUser();
    const view = sessionStorage.getItem("currentView");

    return (
      <>
        <header>
          <nav className="navbar navbar-expand-md transparent">
            <div>
              <a href="/" className="navbar-brand">
                <img
                  src={logo}
                  height="50px"
                  className="d-inline-block align-top"
                  alt="localite logo"
                />
              </a>
            </div>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              {(!user || user.type === "tourist") && (
                <li>
                  <Link className="nav-link header-link" to="/signup/guide">
                    BECOME A GUIDE
                  </Link>
                </li>
              )}

              {isUserLoggedIn && (
                <li>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="header-link header-btn"
                      id="dropdown-basic"
                    >
                      <Image src={profile} height="50px" roundedCircle />{" "}
                      {user.firstName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => this.props.history.push(`/account/info`)}
                      >
                        Account Information
                      </Dropdown.Item>

                      {user.type === "tourguide" && view === "tourguide" && (
                        <Dropdown.Item
                          onClick={() =>{
                            this.props.history.push(`/account/show/${user._id}`)
                            this.forceUpdate()
                            window.location.reload(false)
                          }}
                        >
                          View Profile
                        </Dropdown.Item>
                      )}

                      <Dropdown.Item
                        onClick={() =>
                          this.props.history.push(
                            `/account/${user._id}/upcoming`
                          )
                        }
                      >
                        Upcoming Tours
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          this.props.history.push(
                            `/account/${AccountService.getCurrentUser._id}/past`
                          )
                        }
                      >
                        Past Tours
                      </Dropdown.Item>
                      <Dropdown.Item>Messages</Dropdown.Item>
                      <div className="dropdown-divider"></div>
                      {user.type === "tourguide" && view === "tourist" && (
                        <Dropdown.Item
                          style={{ fontWeight: "bold", color: "green" }}
                          onClick={() => {
                            sessionStorage.setItem("currentView", "tourguide");
                            this.forceUpdate();
                            window.location.reload(false);
                          }}
                        >
                          Switch to Tour Guide View
                        </Dropdown.Item>
                      )}

                      {user.type === "tourguide" && view === "tourguide" && (
                        <Dropdown.Item
                          style={{ fontWeight: "bold", color: "green" }}
                          onClick={() => {
                            sessionStorage.setItem("currentView", "tourist");
                            this.forceUpdate();
                            window.location.reload(false);
                          }}
                        >
                          Switch to Tourist View
                        </Dropdown.Item>
                      )}

                      {/* 
                      {user.type === "tourguide" && this.state.currentView === "tourist" && <Dropdown.Item
                        style={{ fontWeight: "bold", color: "green" }}
                        href="/"
                        onClick={this.setState({currentView: "tourguide"})}
                      >
                        Switch to Tour Guide View
                      </Dropdown.Item>}

                      {user.type === "tourguide" && this.state.currentView === "tourguide" && <Dropdown.Item
                        style={{ fontWeight: "bold", color: "green" }}
                        href="/"
                        onClick={this.setState({currentView: "tourist"})}
                      >
                        Switch to Tourist View
                      </Dropdown.Item>} */}
                      <Dropdown.Item
                        style={{ fontWeight: "bold" }}
                        href="/"
                        onClick={AccountService.logout}
                      >
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              )}

              {!isUserLoggedIn && (
                <li>
                  <button
                    type="button"
                    className="btn btn-link header-link"
                    style={{ textDecoration: "none" }}
                    onClick={this.handleShow}
                  >
                    SIGN UP/LOG IN
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </header>

        <LoginModalComponent open={this.state.modalOpen} loginSuccess={this.loginSuccess} handleClose={this.handleClose} handleShow={this.handleShow} signUpClicked={this.signUpClicked}/>
      </>
    );
  }
}

export default withRouter(HeaderComponent);
