import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { Formik, Form } from "formik";
import StarRatingComponent from "react-star-rating-component";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import PublicService from "../api/PublicService"
import TourService from "../api/TourService"

class FilterModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      selectedValues: [],
      start: 1,
      end: 200,
      price: [1, 100],
      selectedRating: null,
      minRating: 1,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let dict = [];
    let tagList = [];
    PublicService.getTourTags().then((response) => {
      console.log(response);
      if (response) {
        tagList = response.data;
      }
    });

    tagList.map((tagName) =>
      dict.push({
        tag: tagName,
      })
    );
    this.setState({ tags: dict });
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedValues: selectedList });
  };

  onRemove = (selectedList, removedItem) => {
    this.setState({ selectedValues: selectedList });
  };

  handleChange = (event, newValue) => {
    this.setState({ price: newValue });
  };

  handleBoxChange = () => {};

  valuetext = (value) => {
    return `$${value}`;
  };

  selectRating = (event) => {
    console.log(event.target.value);
  };

  render() {
    const maximum = 200;
    const minimum = 1;

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
            onSubmit={({ setSubmitting }) => {
              setSubmitting(false);
              TourService.filterTours(
                this.state.selectedValues,
                this.state.price[0],
                this.state.price[1],
                this.state.minRating
              ).then(
                (response) => {
                  setSubmitting(false);
                  if (response.data.success) {
                    //set tours in TourResultsComponent
                  } else {
                  }
                },
                (error) => {
                  setSubmitting(false);
                }
              );
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
                    <div style={{ padding: "10px" }}>
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
                    <form>
                      $
                      <input
                        type="text"
                        style={{ width: "80px" }}
                        value={this.state.price[0]}
                        onChange={this.handleBoxChange}
                      ></input>
                      to $
                      <input
                        type="text"
                        style={{ width: "80px" }}
                        value={this.state.price[1]}
                        onChange={this.handleBoxChange}
                      ></input>
                    </form>
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
