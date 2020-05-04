import React, { Component } from "react";
import { Modal, Button, Form, Nav, Dropdown, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import logo from "../images/localite.png";
import profile from "../images/profile.jpg"
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      loginFailed: false,
      user: null
    };

    this.email = React.createRef();
    this.password = React.createRef();
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleShow = () => {
    this.setState({ modalOpen: true });
    console.log(this.state.modalOpen);
  };

  signUpClicked = () => {
    this.setState({ modalOpen: false });
  }

  loginClicked = () => {
    //currently hardcoded
    // console.log(this.email.current.value)
    // console.log(this.password.current.value)
    if (
      this.email.current.value === "ecruz@gmail.com" &&
      this.password.current.value === "1234"
    ) {
      AuthenticationService.registerSuccessfulLogin(
        this.email.current.value,
        this.password.current.value
      )
  
      this.setState({ modalOpen: false });
      this.setState({ loginFailed: false });
    } else {
      this.setState({ loginFailed: true });
    }
  };

  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    console.log(isUserLoggedIn);
    console.log(this.state.user);

    //maybe make new component?
    const form = (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              ref={this.email}
              type="email"
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              ref={this.password}
              type="password"
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>
    );

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
              <li>
                <Link className="nav-link header-link" to="/">
                  BECOME A GUIDE
                </Link>
              </li>
              
              {isUserLoggedIn && <li>
                <Dropdown>
                  <Dropdown.Toggle className="header-link header-btn" id="dropdown-basic">
                  <Image src={profile} height="50px" roundedCircle /> {AuthenticationService.getLoggedInUserName()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">My Account</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item style={{fontWeight: "bold"}} href="/" onClick={AuthenticationService.logout}>
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>}

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

        <Modal show={this.state.modalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>LOG IN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav variant="tabs" defaultActiveKey="tourist">
              <Nav.Item>
                <Nav.Link eventKey="tourist">Tourist</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tourGuide">Tour Guide</Nav.Link>
              </Nav.Item>
            </Nav>
            {this.state.loginFailed && (
              <div
                className="alert alert-warning"
                style={{ marginTop: "10px" }}
              >
                Invalid Credentials
              </div>
            )}
            {form}
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <p>
              Don't have an account? <Link to="/signup" onClick={this.signUpClicked}>Sign up.</Link>
            </p>
            <Button variant="primary" type="submit" onClick={this.loginClicked}>
              LOG IN
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(HeaderComponent);
