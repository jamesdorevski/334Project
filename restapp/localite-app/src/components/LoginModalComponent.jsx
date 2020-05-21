import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountService from "../api/AccountService";

//LINKS USED
//https://bezkoder.com/react-jwt-auth/
//https://jasonwatmore.com/post/2020/04/22/react-email-sign-up-with-verification-authentication-forgot-password

class LoginModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      loading: false,
    };
  }

  emptyMessage = () => {
    this.setState({message: ""})
    this.props.handleClose()
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.emptyMessage}>
          <Modal.Header closeButton>
            <Modal.Title>LOG IN</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ margin: "-30px" }}>
          <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={({ email, password }, { setSubmitting }) => {
          AccountService.loginUser(email, password).then(
            (response) => {
              console.log(response);
              if (response.data.success) {
                setSubmitting(false);
                this.props.loginSuccess()
              } else {
                setSubmitting(false);
                this.setState({
                  loading: false,
                  message: "Unable to log in: " + response.data.message,
                });
              }
            },
            (error) => {
              setSubmitting(false);

              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

              this.setState({
                loading: false,
                message: resMessage,
              });
            }
          );
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="card-body">
              <div className="form-group">
                <label>Email</label>
                <Field
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <div className="form-row" style={{"marginTop": "30px", "position": "absolute"}}>
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Login
                  </button>
                  <p style={{"fontSize": "14px", "paddingTop": "10px"}}>
                    Don't have an account?{" "}
                    <Link to="/signup" onClick={this.props.signUpClicked} style={{"color": "#007bff"}}>
                      Sign up.
                    </Link>
                  </p>
                </div>
                <div className="form-group col">
                  <Link
                    to="forgot-password"
                    className="btn btn-link pr-0"
                    style={{ fontSize: "14px", paddingLeft: "140px" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
          </Modal.Body>
          <Modal.Footer>
            <br></br>
            <br></br>
            <br></br>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default LoginModalComponent;
