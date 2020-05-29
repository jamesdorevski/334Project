import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AccountService from "../api/AccountService";
import PublicService from "../api/PublicService";
import StarRatingComponent from "react-star-rating-component";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

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
      price: [1, 100],
      selectedRating: null
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // let dict = []
    // const tagList = []
    // PublicService.getTourTags().then((response) => {
    //   console.log(response);
    //   if (response) {
    //     tagList = response.data
    //   } else {
    //     //idk
    //   }
    // });

    // tagList.map((tagName) =>
    //   dict.push({
    //     tag: tagName,
    //   })
    // );
    // this.setState({ tags: dict });
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedValues: selectedList });
    // console.log(this.state.selectedValues)
  };

  onRemove = (selectedList, removedItem) => {
    this.setState({ selectedValues: selectedList });
    // console.log(this.state.selectedValues)
  };

  handleChange = (event, newValue) => {
    this.setState({ price: newValue });
  };
  
  valuetext = (value) => {
    return `$${value}`;
  }

  selectRating = (event) => {
    console.log(event.target.value)
  }

  render() {
    const maximum = 200
    const minimum = 1

    const marks = [
      {
        value: minimum,
        label: `$${minimum}`,
      },
      {
        value: maximum,
        label: `$${maximum}`,
      },
    ];
    return (
      <Modal show={this.props.open} onHide={this.props.handleClose}>
        <Modal.Body style={{ margin: "-30px" }}>
          <Formik
            initialValues={{
              tags: this.state.selectedValues,
            }}
            onSubmit={({}, { setSubmitting }) => {
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
                    <Typography id="range-slider" gutterBottom>
                      Price
                    </Typography>
                    <div style={{padding: "10px"}}>
                    <Slider
                      value={this.state.price}
                      onChange={this.handleChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      getAriaValueText={this.valuetext}
                      marks={marks}
                      min={minimum}
                      max={maximum}
                    />
                    </div>
                    
                  </div>

                  <div className="form-group">
                    <label htmlFor="tags">Rating</label>

                    {[1, 2, 3, 4].map((n) => {
                      return (
                        <>
                          <div
                            key={n}
                            className="rowC"
                            style={{ marginBottom: "-20px" }}
                            onClick={() => this.selectRating}
                          >
                            <StarRatingComponent
                              editing={false}
                              starCount={5}
                              value={n}
                            />
                            <p style={{ paddingLeft: "5px" }}>&amp; up</p>
                          </div>
                        </>
                      );
                    })}
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
