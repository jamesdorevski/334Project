import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PublicService from "../api/PublicService";

class DisputeResolutionModalComponent extends Component {
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
              PublicService.fileDispute(
                this.props.userID,
                this.props.guideID,
                message
              ).then((response) => {
                setSubmitting(false);
                console.log(response);
                if (response.data.success) {
                  //success message
                  this.setState({
                    message: `Dispute #${response.data.disputeNumb} has been filed. Please check your email for confirmation, and an admin will contact you shortly.`,
                    success: true,
                  });
                } else {
                  //error message
                  this.setState({
                    message: "Unable to file dispute. Please try again later.",
                    success: false,
                  });
                }
              });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="card-body">
                  <h3>
                    Filing dispute against: {this.props.against.firstName}
                  </h3>
                  <div className="form-group">
                    <label>What is the cause of your dispute?</label>
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
                          File Dispute
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mr-2"
                          style={{ margin: "5px" }}
                          onClick={this.props.close}
                        >
                          Close
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

export default DisputeResolutionModalComponent;
