import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import MessageService from "../api/MessageService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

class FilterModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      success: false,
    };
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.handleClose}>
        <Modal.Body style={{ margin: "-30px" }}>
          <Formik
            initialValues={{
              message: "",
            }}
            validationSchema={Yup.object().shape({
              message: Yup.string().required("Message is required"),
            })}
            onSubmit={({ message }, { setSubmitting }) => {
              console.log(message);
              MessageService.sendMessage(
                this.props.loggedInID,
                this.props.guideID,
                message
              ).then((response) => {
                setSubmitting(false);
                if (response.data.success) {
                  //success message
                  this.setState({
                    message: "Message sent!",
                    success: true,
                  });
                } else {
                  //error message
                  this.setState({
                    message: "Unable to send message.",
                    success: false,
                  });
                }
              });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="card-body">
                  <h3>Sending message to: {this.props.name}</h3>
                  <div className="form-group">
                    <label>Message</label>
                    <Field
                      name="message"
                      type="text"
                      component="textarea"
                      style={{ width: "450px", height: "200px" }}
                      className={
                        "form-control" +
                        (errors.message && touched.message ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="invalid-feedback"
                    />
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
                  <div className="form-row" style={{}}>
                    <div className="form-group col">
                      <center>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                          style={{ margin: "5px" }}
                        >
                          {isSubmitting && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Send Message
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mr-2"
                          style={{ margin: "5px" }}
                          onClick={this.props.close}
                        >
                          Cancel
                        </button>
                      </center>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default FilterModalComponent;
