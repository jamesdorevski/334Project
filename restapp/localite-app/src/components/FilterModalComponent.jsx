import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountService from "../api/AccountService";

class FilterModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value5: {
        min: 3,
        max: 7,
      },
      tags: [
        { tag: "Night Tour" },
        { tag: "Day Trip" },
        { tag: "Food" },
        { tag: "Wine" },
        { tag: "Hiking and Outdoors" },
        { tag: "Museums" },
        { tag: "Shopping" },
      ],
      selectedValues: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedValues: selectedList });
    // console.log(this.state.selectedValues)
  };

  onRemove = (selectedList, removedItem) => {
    this.setState({ selectedValues: selectedList });
    // console.log(this.state.selectedValues)
  };

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.handleClose}>
        <Modal.Body style={{ margin: "-30px" }}>
          <Formik
            initialValues={{
              tags: this.state.selectedValues,
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
                  setSubmitting(false);
                  if (response.data.success) {
                    setSubmitting(false);
                  } else {
                  }
                },
                (error) => {
                  setSubmitting(false);
                }
              );
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="card-body">
                  <h3>FILTERS</h3>
                  <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <Multiselect
                      options={this.state.tags}
                      displayValue="tag"
                      showCheckbox={true}
                      onRemove={this.onRemove}
                      onSelect={this.onSelect}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tags">Price</label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="tags">Rating</label>
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
                          Apply Filters
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
