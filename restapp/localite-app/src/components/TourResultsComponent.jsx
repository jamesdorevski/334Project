import React, { Component } from "react";
import qs from "qs";
import axios from "axios";
import Tour from "./TourComponent";
import Loader from "react-loader-spinner";
import FilterModalComponent from "./FilterModalComponent";

class TourResultsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loaded: false,
      error: false,
      tours: [],
      modalOpen: false,
    };
  }
  goToTour = (tour_id) => {
    this.props.history.push(`/tours/${tour_id}`);
  };

  goToProfile = (guide_id) => {
    this.props.history.push(`/account/show/${guide_id}`);
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleShow = () => {
    this.setState({ modalOpen: true });
  };

  componentDidMount = () => {
    const params = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    console.log("params " + JSON.stringify(params));
    axios
      .post("http://localhost:8080/tour/search", params)
      .then((res) => {
        const { data: json } = res;
        console.log(json);
        this.setState({
          tours: json.tours,
          loaded: true,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: "Something went wrong loading search results.",
        });
      });
  };

  render() {
    const { error, loading } = this.state;
    return (
      <>
        {loading && (
          <div
            style={{
              width: "100%",
              height: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Fetching tours</h2>
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
          </div>
        )}

        <hr
          style={{
            margin: "-2px",
          }}
        />
        <div
          className="rowC"
          style={{ textAlign: "left", paddingLeft: "20px", paddingTop: "20px" }}
        >
          {this.state.tours?.length > 0 && (
            <h4>
              {this.state.tours?.length} tours are available for your dates!
            </h4>
          )}
          {this.state.tours?.length === 0 && (
            <h4>No tours are available for your dates.</h4>
          )}
          <button
            type="button"
            className="btn btn-link"
            style={{ textDecoration: "none" }}
            onClick={this.handleShow}
          >
            FILTERS
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}

        {this.state.tours && (
          <div>
            {this.state.tours.map((tour) => (
              <div key={tour.id}>
                <Tour
                  tour={tour}
                  goToTour={this.goToTour}
                  goToProfile={this.goToProfile}
                />
                <hr />
              </div>
            ))}
          </div>
        )}

        <FilterModalComponent
          open={this.state.modalOpen}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
        />
      </>
    );
  }
}

export default TourResultsComponent;
