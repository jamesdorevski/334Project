import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import AccountService from "../api/AccountService";
import MessageGuideComponent from "./MessageGuideComponent";

class ViewBookingsAsTouristComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageOpen: false,
    };
  }

  handleMessageOpen = () => this.setState({ messageOpen: true });
  handleMessageClose = () => this.setState({ messageOpen: false });

  getTotalGuests = (parties) => {
    return parties.adult + parties.child + parties.infant;
  };

  render() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const loggedIn = AccountService.getCurrentUser();

    const date = new Date(this.props.booking.dateBooked);
    return (
      <>
        <Card style={{ width: 500 }}>
          {/* tour title */}
          <Card.Header as="h5">{this.props.booking.tour.name}</Card.Header>
          <Card.Body>
            {/* tour date */}
            <Card.Title>
              {monthNames[date.getMonth()] +
                " " +
                date.getDate().toString() +
                ", " +
                date.getFullYear().toString()}
            </Card.Title>
            <Card.Text>
              <b>Confirmation #94iakn</b>
              <br />
              <b>Tour Guide:</b> {this.props.booking.tour.tourGuide.firstName}
              <br />
              <b>Number of Guests: </b>
              {this.getTotalGuests(this.props.booking.parties)}
              <br />
              <b>Price:</b> ${this.props.booking.totalPrice}
              <br />
              <b>Dietary Restrictions: </b>
              {this.props.booking.dietaryRequirement}
              <br />
            </Card.Text>
            <Button
              style={{
                backgroundColor: "transparent",
                color: "grey",
                border: "transparent",
              }}
              onClick={() => this.props.goToTour(this.props.booking.tour._id)}
            >
              VIEW TOUR
            </Button>

            <Button
              style={{
                backgroundColor: "transparent",
                color: "grey",
                border: "transparent",
              }}
              onClick={() => this.handleMessageOpen()}
            >
              MESSAGE GUIDE
            </Button>
          </Card.Body>
        </Card>

        <MessageGuideComponent
          open={this.state.messageOpen}
          close={this.handleMessageClose}
          name={this.props.booking.tour.tourGuide.firstName}
          guideID={this.props.booking.tour.tourGuide._id}
          loggedInID={loggedIn._id}
        />
      </>
    );
  }
}

export default ViewBookingsAsTouristComponent;
