import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Figure } from "react-bootstrap";
import AccountService from "../api/AccountService";
import PublicService from "../api/PublicService";
import { Multiselect } from "multiselect-react-dropdown";

class UpdateAccountComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      success: false,
      langArray: [],
      selectedValues: [],
      user: AccountService.getCurrentUser(),
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let dict = [];
    this.state.user.languagesSpoken.map((language) =>
      dict.push({
        lang: language,
      })
    );
    this.setState({ selectedValues: dict });

    let temp = [];
    PublicService.getLanguages().then((response) => {
      if (response) {
        // console.log(response.data)
        response.data.map((language) =>
          temp.push({
            lang: language,
          })
        );
        this.setState({ langArray: temp });
      }
    });
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedValues: selectedList });
    // console.log(this.state.selectedValues);
  };

  onRemove = (selectedList, removedItem) => {
    this.setState({ selectedValues: selectedList });
    // console.log(this.state.selectedValues)
  };

  render() {
    // console.log(this.state.user);

    // const genders = [
    //   { label: "Male", value: "Male" },
    //   { label: "Female", value: "Female" },
    //   { label: "Trans male", value: "Trans male" },
    //   { label: "Trans female", value: "Trans female" },
    //   { label: "Genderqueer/Nonbinary", value: "Genderqueer/Nonbinary" },
    //   { label: "Other/Prefer not to say", value: "Other/Prefer not to say" },
    // ];

    return (
      <div
        style={{ textAlign: "left", padding: "10px" }}
        className="container"
        background-color="transparent"
      >
        <h3 style={{ paddingBottom: "20px", textAlign: "left" }}>
          Personal Info
        </h3>
        <Figure.Image
          roundedCircle
          fluid
          style={{
            objectFit: "cover",
            width: "150px",
            height: "150px",
          }}
          src={this.state.user.img}
        />
        <br />
        <button type="button" className="link-button">
          Upload new profile picture
        </button>
        <div style={{ padding: "10px" }}></div>
        <Formik
          initialValues={{
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            email: this.state.user.email,
            password: "",
            confirmPassword: "",
            gender: this.state.user.gender,
            phoneNumber: this.state.user.phoneNumber,
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string()
              .email("Email is invalid")
              .required("Email is required"),
            password: Yup.string().min(
              6,
              "Password must be at least 6 characters"
            ),
            confirmPassword: Yup.string()
              .when("password", (password, schema) => {
                if (password)
                  return schema.required("Confirm Password is required");
              })
              .oneOf([Yup.ref("password")], "Passwords must match"),
            gender: Yup.string().required("Gender is required"),
            phoneNumber: Yup.string().required("Phone Number is required"),
            languagesSpoken: Yup.array()
              .max(1, "Must have at least 1 language spoken")
              .of(
                Yup.object().shape({
                  label: Yup.string().required(),
                  value: Yup.string().required(),
                })
              ),
          })}
          onSubmit={(fields, { setSubmitting }) => {
            // find a way to pass fields as an object so we can extract the params in AuthService
            AccountService.updateUser(
              fields.firstName,
              fields.lastName,
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
                    message:
                      "Unable to update account: " + response.data.message,
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
                <label htmlFor="password">Change Password</label>
                <p>Leave blank to keep the same password.</p>
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
                <label htmlFor="confirmPassword">Confirm Change Password</label>
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
                <Field
                  as="select"
                  name="gender"
                  type="text"
                  className={
                    "form-control" +
                    (errors.gender && touched.gender ? " is-invalid" : "")
                  }
                >
                  {" "}
                  <option
                    value={this.state.user.gender}
                    label={this.state.user.gender}
                  />
                  {this.state.user.gender !== "Male" && (
                    <option value="Male" label="Male" />
                  )}
                  {this.state.user.gender !== "Female" && (
                    <option value="Female" label="Female" />
                  )}
                  {this.state.user.gender !== "Trans male" && (
                    <option value="Trans Male" label="Trans Male" />
                  )}
                  {this.state.user.gender !== "Trans female" && (
                    <option value="Trans Female" label="Trans Female" />
                  )}
                  {this.state.user.gender !== "Genderqueer/Nonbinary" && (
                    <option
                      value="Genderqueer/Nonbinary"
                      label="Genderqueer/Nonbinary"
                    />
                  )}
                  {this.state.user.gender !== "Other/Prefer not to say" && (
                    <option
                      value="Other/Prefer not to say"
                      label="Other/Prefer not to say"
                    />
                  )}
                  {/* TRIED DOING THIS BUT DIDN'T WORK - WILL TRY AGAIN LATER
                  <option value="" label={this.state.user.gender} />
                  {genders.map((gender) => {
                    //   <option key={gender.label} value={gender.value}>
                    //   {gender.value}
                    // </option>
                    if (this.state.user.gender != gender.label)
                      return (
                        <option key={gender.label} value={gender.value}>
                          {gender.value}
                        </option>
                      );
                  })} */}
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
                    (errors.phoneNumber && touched.phoneNumber
                      ? " is-invalid"
                      : "")
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
                  selectedValues={this.state.selectedValues}
                  className={
                    "form-control" +
                    (errors.languagesSpoken && touched.languagesSpoken
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="languagesSpoken"
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
                  Update Profile
                </button>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={() => {
                    this.props.history.push(`/account/${this.state.user._id}`);
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

export default UpdateAccountComponent;
