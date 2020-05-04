import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import TourService from "../api/TourService"

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
    // const tourList = [
    //   {
    //     tourName: "Backpacking in the Blue Mountains",
    //     id: 0,
    //     tourGuide: { firstName: "James" },
    //     description: "Description of Backpacking in the Blue Mountains",
    //   },
    //   {
    //     tourName: "Food Tour of Sydney",
    //     id: 1,
    //     tourGuide: { firstName: "Josh" },
    //     description: "Description of Food Tour of Sydney",
    //   },
    //   {
    //     tourName: "Day Hike - Syndey Harbour National Park",
    //     id: 2,
    //     tourGuide: { firstName: "Andrea" },
    //     description: "Description of Day Hike - Syndey Harbour National Park",
    //   },
    // ];

    // this.setState({ tours: tourList });

    TourService.getTours("Australia", "Sydney")
        .then(response => {
            console.log(response)
            this.setState({tours: response.data});
        })
  };

  render() {
    // This will render a given number of tours returned by the backend function.
    // If the user wants more tours, it will make another call to the backend and return more tours
    // We could have a set number and they can click next for the next set of tours
    return (
      <>
        <h1>TOURS</h1>
        <div>
          {this.state.tours.map((tour) => (
            <div key={tour.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{tour.tourName}</Card.Title>
                  <Card.Text>
                    <b>{tour.tourGuide.firstName}</b>
                    <br/>
                    {tour.description}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              <hr />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default TourResultsComponent;
