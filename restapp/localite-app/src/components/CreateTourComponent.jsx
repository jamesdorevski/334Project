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
      tags: [
        { tag: "Night Tour" },
        { tag: "Day Trip"},
        { tag: "Food"},
        { tag: "Wine"},
        { tag: "Hiking and Outdoors"},
        { tag: "Museums" },
        { tag: "Shopping"}
      ],
      selectedValues: [
      ]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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

    return (
      <div
      style={{ padding: "10px" }}
      className="container"
      background-color="transparent"
    >
      <h3 style={{ paddingBottom: "20px" }}>
          Create a new tour
        </h3>
      <Formik
        initialValues={{
          tourName: "",
          description: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: ""
        }}

        validationSchema={Yup.object().shape({
          tourName: Yup.string()
            .max(40, "Tour name cannot exceed 40 characters")
            .required("Tour Name is required"),
          description: Yup.string().required("Description is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
          gender: Yup.string().required("Gender is required"),
          phoneNumber: Yup.string().required("Phone Number is required"),
          tags: Yup.array().max(
            2,
            "Must have at least 2 tags"
          ).of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        }))

        })}

        onSubmit={(fields, { setSubmitting }) => {
          // find a way to pass fields as an object so we can extract the params in AuthService
          AccountService.createUser(
            fields.tourName,
            fields.description,
            fields.email,
            fields.password,
            fields.gender,
            fields.phoneNumber,
            this.state.selectedValues
          ).then(
            (response) => {
              console.log(response);
              setSubmitting(false);
              if (response.data.success) {
                this.setState({
                  message: response.data.message,
                  success: true,
                });
              } else {
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
              <label htmlFor="tourName">Tour Name</label>
              <Field
                name="tourName"
                type="text"
                className={
                  "form-control" +
                  (errors.tourName && touched.tourName ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="tourName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                type="text"
                component="textarea"
                className={
                  "form-control" +
                  (errors.description && touched.description ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="description"
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
              <label htmlFor="gender">Gender</label>
              <Field as="select"
                name="gender"
                type="text"
                className={
                  "form-control" +
                  (errors.gender && touched.gender ? " is-invalid" : "")
                }
              >
                {" "}
                <option value="" label="Select your Gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
                <option value="Trans Male" label="Trans Male" />
                <option value="Trans Female" label="Trans Female" />
                <option
                  value="Genderqueer/Nonbinary"
                  label="Genderqueer/Nonbinary"
                />
                <option
                  value="Other/Prefer not to say"
                  label="Other/Prefer not to say"
                />
              </Field>
              <ErrorMessage
                name="gender"
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
            <label htmlFor="tags">Tags</label>
            <Multiselect
              options={this.state.tags}
              displayValue="tag"
              showCheckbox={true}
              onRemove={this.onRemove}
              onSelect={this.onSelect}
              className={
                "form-control" +
                (errors.tags && touched.tags ? " is-invalid" : "")
              }
            />
            <ErrorMessage
                name="tags"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary mr-2"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Create Tour
                </button>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={() => {
                    this.props.history.push(`/account/show/${AccountService.getCurrentUser()._id}`);
                  }}
                >
                  Cancel
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
      </div>
    );
  }
}

export default SignUpComponent;
