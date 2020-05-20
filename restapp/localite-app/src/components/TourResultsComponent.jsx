import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import TourService from "../api/TourService";
import Tour from "./TourComponent";

class TourResultsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tours: [],
    };
  }

  componentDidMount = () => {
    //called when the page is rendered
    this.renderTours();
  };

  renderTours = () => {
    //this will call the backend API and return the first X tours
    const tourList = [
      {
        tourName: "Backpacking in the Blue Mountains",
        _id: 0,
        tourGuide: {
          firstName: "James",
          img: require("../images/james.jpg"),
          rating: 4.7,
        },
        description: "Description of Backpacking in the Blue Mountains",
        basePrice: 90,
        img: require("../images/mountains.jpg"),
        tags: ["Outdoors", "Day Trip"],
      },
      {
        tourName: "Food Tour of Sydney",
        _id: 1,
        tourGuide: {
          firstName: "Josh",
          img: require("../images/josh.jpg"),
          rating: 4.5,
        },
        description: "Description of Food Tour of Sydney",
        basePrice: 85,
        img: require("../images/foodtour.jpg"),
        tags: ["Food", "Kid-friendly", "Private Tours Available"],
      },
      {
        tourName: "Day Hike - Syndey Harbour National Park",
        _id: 2,
        tourGuide: {
          firstName: "Andrea",
          img: require("../images/andrea.jpg"),
          rating: 4.8,
        },
        description: "Description of Day Hike - Syndey Harbour National Park",
        basePrice: 50,
        img: require("../images/sydney-harbour.jpg"),
        tags: ["Outdoors", "Day Trip"],
      },
    ];

    this.setState({ tours: tourList });

    // TourService.getTours("Australia", "Sydney")
    //     .then(response => {
    //         console.log(response)
    //         this.setState({tours: response.data});
    //     })
  };

  render() {
    // This will render a given number of tours returned by the backend function.
    // If the user wants more tours, it will make another call to the backend and return more tours
    // We could have a set number and they can click next for the next set of tours
    return (
      <>
        <hr
          style={{
            color: "black",
            backgroundColor: "black",
            height: 0,
            margin: "-2px",
          }}
        />
        <div
          style={{ textAlign: "left", paddingLeft: "20px", paddingTop: "20px" }}
        >
          <h6>{this.state.tours.length} Tours • May 5-7</h6>
          <h3>Tours in Sydney</h3>
        </div>
        <div>
          {this.state.tours.map((tour) => (
            <div key={tour._id}>
              <Tour tour={tour} />
              <hr />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default TourResultsComponent;
