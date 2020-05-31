import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { Formik, Form } from "formik";

import Typography from "@material-ui/core/Typography";
import PublicService from "../api/PublicService";

class FilterModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
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
            onSubmit={({ fields, setSubmitting }) => {
              setSubmitting(false);
              // AccountService.loginUser(email, password).then(
              //   (response) => {
              //     console.log(response);
              //     setSubmitting(false);
              //     if (response.data.success) {
              //       setSubmitting(false);
              //     } else {
              //     }
              //   },
              //   (error) => {
              //     setSubmitting(false);
              //   }
              // );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="card-body">
                  <h3>Sending message to: </h3>
                  <div className="form-group">
                <label htmlFor="message">Message</label>
                <Field
                  name="message"
                  type="text"
                  component="textarea"
                  className={
                    "form-control" +
                    (errors.message && touched.message
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

                  <div className="form-row" style={{}}>
                    <div className="form-group col">
                      <center>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          {isSubmitting && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Send Message
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
