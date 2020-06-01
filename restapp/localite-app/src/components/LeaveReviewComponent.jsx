import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountService from "../api/AccountService";
import StarRatingComponent from "react-star-rating-component";


class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      success: false,
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }


  render() {

    return (
      <div
      style={{ padding: "10px", maxWidth: "800px", border: "1px solid #ced4da", borderRadius: 15 }}
      className="container"
      background-color="transparent"
    >
      <Formik
        initialValues={{
          title: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: ""
        }}

        validationSchema={Yup.object().shape({
          title: Yup.string()
          .max(40, "Review title cannot exceed 40 characters")
          .required("Review title is required"),
          description: Yup.string().required("Description is required"),  
        })}

        onSubmit={(fields, { setSubmitting }) => {
          
          AccountService.createUser(
            fields.title,
            fields.description,
            
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
                  message: "Unable to leave review: " + response.data.message,
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
              <label htmlFor="title">Review Title</label>
              <Field
                name="title"
                type="title"
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
              <label htmlFor="description">Rating</label>
              <br/>
              <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
              </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
              {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                Leave Review
              </button>
              <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={
                    this.props.close
                  }
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
