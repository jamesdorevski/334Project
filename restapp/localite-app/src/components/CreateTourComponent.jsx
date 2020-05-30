import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountService from "../api/AccountService";
import PublicService from "../api/PublicService";
import TourService from "../api/TourService";
import { Multiselect } from "multiselect-react-dropdown";
import TextField from "@material-ui/core/TextField";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      success: false,
      tags: [],
      selectedValues: [],
      currency: "USD",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    let dict = [];
    PublicService.getTourTags().then((response) => {
      if (response) {
        // console.log(response.data)
        response.data.map((tagName) =>
          dict.push({
            tag: tagName,
          })
        );
        this.setState({ tags: dict });
      }
    });
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedValues: selectedList });
    // console.log(this.state.selectedValues)
  };

  onRemove = (selectedList, removedItem) => {
    this.setState({ selectedValues: selectedList });
    // console.log(this.state.selectedValues)
  };

  handleChange = (event) => {
    this.setState({ currency: event.target.value });
  };

  render() {
    return (
      <div
        style={{ padding: "10px" }}
        className="container"
        background-color="transparent"
      >
        <h3 style={{ paddingBottom: "20px" }}>Create a new tour</h3>
        <Formik
          initialValues={{
            tourName: "",
            description: "",
            location: "",
            maxCapacity: 10,
            basePrice: 20,
          }}
          validationSchema={Yup.object().shape({
            tourName: Yup.string()
              .max(40, "Tour name cannot exceed 40 characters")
              .required("Tour Name is required"),
            description: Yup.string().required("Description is required"),
            location: Yup.string().required("Location is required"),
            maxCapacity: Yup.number()
              .max(100, "Maximum capacity cannot exceed 100 people")
              .required("Maximum capacity is required"),
            basePrice: Yup.number()
              .integer("Price must be a whole number")
              .required("Base price is required"),
            tags: Yup.array()
              .of(Yup.object().shape({ tag: Yup.string().required() }))
              .min(2, "Must have at least 2 tour tags")
              .required("Tour tags are required"),
            //   tags: Yup.array().max(
            //     2,
            //     "Must have at least 2 tags"
            //   ).of(
            // Yup.object().shape({
            //   tag: Yup.string().required(),
            //   value: Yup.string().required(),
            // }))
          })}
          onSubmit={(fields, { setSubmitting }) => {
            // find a way to pass fields as an object so we can extract the params in AuthService
            TourService.createUser(
              AccountService.getCurrentUser._id,
              fields.tourName,
              fields.description,
              fields.location,
              fields.maxCapacity,
              fields.basePrice,
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
                      "Unable to create account: " + response.data.message,
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
                    (errors.description && touched.description
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <Field
                  name="location"
                  type="text"
                  className={
                    "form-control" +
                    (errors.location && touched.location ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxCapacity">Maximum Capacity</label>
                <center>
                  <Field
                    name="maxCapacity"
                    style={{ width: "100px" }}
                    type="text"
                    className={
                      "form-control" +
                      (errors.maxCapacity && touched.maxCapacity
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="maxCapacity"
                    component="div"
                    className="invalid-feedback"
                  />
                </center>
              </div>
              <div className="form-group">
                <label htmlFor="tags">Base Price</label>

                <div className="rowC">
                  <TextField
                    id="standard-select-currency-native"
                    select
                    value={this.state.currency}
                    onChange={this.handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    // helperText="Please select your currency"
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <Field
                    name="basePrice"
                    style={{ width: "100px" }}
                    type="text"
                    className={
                      "form-control" +
                      (errors.basePrice && touched.basePrice
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="basePrice"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
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
                    this.props.history.push(
                      `/account/show/${AccountService.getCurrentUser()._id}`
                    );
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
