import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountService from "../api/AccountService";
import { Multiselect } from "multiselect-react-dropdown";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      success: false,
      langArray: [
        { lang: "English" },
        { lang: "Spanish"},
        { lang: "French"},
        { lang: "Arabic"},
        { lang: "Chinese"},
        { lang: "Greek" },
        { lang: "Italian"}
      ],
      selectedValues: [
      ]
    };
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState({selectedValues: selectedList})
    // console.log(this.state.selectedValues)
  }

  onRemove = (selectedList, removedItem) => {
    this.setState({selectedValues: selectedList})
    // console.log(this.state.selectedValues)
  }

  render() {
    const t = this.props.type
    let type = ""
    if (t === "tourguide") {
            type = "tourguide"
          } else {
            type = "tourist"
          }

    return (
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: ""
        }}

        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
          phoneNumber: Yup.string().required("Phone Number is required")
        })}

        onSubmit={(fields, { setSubmitting }) => {
          // find a way to pass fields as an object so we can extract the params in AuthService
          AccountService.createUser(
            type,
            fields.firstName,
            fields.lastName,
            fields.email,
            fields.password,
            fields.phoneNumber,
            this.state.selectedValues
          ).then(
            (response) => {
              console.log(response);
              if (response.data.success) {
                this.setState({
                  message: response.data.message,
                  success: true,
                });
              } else {
                setSubmitting(false);

                this.setState({
                  success: false,
                  message: "Unable to create account: " + response.data.message,
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
                success: false,
                message: resMessage,
              });
            }
          );
        }}
        
        render={({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field
                name="firstName"
                type="text"
                className={
                  "form-control" +
                  (errors.firstName && touched.firstName ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field
                name="lastName"
                type="text"
                className={
                  "form-control" +
                  (errors.lastName && touched.lastName ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={
                  "form-control" +
                  (errors.confirmPassword && touched.confirmPassword
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field
                name="phoneNumber"
                type="text"
                className={
                  "form-control" +
                  (errors.phoneNumber && touched.phoneNumber ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
            <label htmlFor="languagesSpoken">Languages Spoken</label>
            <Multiselect
              options={this.state.langArray}
              displayValue="lang"
              showCheckbox={true}
              onRemove={this.onRemove}
              onSelect={this.onSelect}
            />
            </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
              {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                Register
              </button>
            </div>
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
          </Form>
        )}
      />
    );
  }
}

export default SignUpComponent;
