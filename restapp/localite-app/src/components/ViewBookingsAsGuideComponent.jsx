import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class ViewBookingsAsGuideComponent extends Component {
  render() {
    return (
      <>
        <Card style={{ width: 300 }}>
          <Card.Body>
            {/* start of booking information */}
            <Card.Title>Confirmation #XR3f4</Card.Title>
            <Card.Text>
              <b>Guest:</b> Karen Smith
              <br />
              <b>Number of Guests:</b> 3<br />
              <b>Total Cost:</b> $34
            </Card.Text>
            {/* view booking link */}
            <Card.Link class="view-booking-btn" href="#">
              VIEW BOOKING
            </Card.Link>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default ViewBookingsAsGuideComponent;
