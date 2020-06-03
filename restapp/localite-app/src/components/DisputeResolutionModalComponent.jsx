import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import MessageService from "../api/MessageService"
import { Formik, Form, Field } from "formik";
import PublicService from "../api/PublicService"


class DisputeResolutionModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      success: false
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
            onSubmit={({ message, setSubmitting }) => {
              
              PublicService.fileDispute(this.props.userID, this.props.guideID, message).then(
                (response) => {
                  setSubmitting(false);
                  if (response.data.success) {
                    //success message
                    this.setState({
                      success: false,
                      message: `Successfully filed dispute #${response.data.disputeNumb}. Please check your email for confirmation.`,
                    });
                  } else {
                    //error message
                    this.setState({
                      success: false,
                      message: "Unable to file dispute. Please try again later.",
                    });
                  }
                }
              )
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="card-body">
            <h3>Filing dispute against: {this.props.against.firstName}</h3>
                  <div className="form-group">
                <label htmlFor="message">What is the cause of your dispute?</label>
                <br/>
                <Field
                  name="message"
                  type="text"
                  component="textarea"
                  style={{width: "450px", height: "200px"}}
                />
              </div>

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
                  onClick={
                    this.props.close
                  }
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
        </Modal.Body>
      </Modal>
    );
  }
}

export default DisputeResolutionModalComponent;
