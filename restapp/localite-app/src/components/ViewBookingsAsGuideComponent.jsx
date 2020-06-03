import React, { Component, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

class ViewBookingsAsGuideComponent extends Component {
  render() {
    return (
      <>
        <div style={{paddingBottom:100}}>
          <div className="container" align="left">
            <div class="row">
              <h1>Upcoming Bookings</h1>
            </div>
            {/* each date with a padding of 50 to divide between each */}
            <div class="row" style={{ paddingTop: 50 }}>
              <h2>04 June 2020</h2>
            </div>
            <div class="row">
              <CardGroup>
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

                <Card style={{ width: 300 }}>
                  <Card.Body>
                    {/* start of 2nd booking information */}
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
              </CardGroup>
            </div>

            <div class="row" style={{ paddingTop: 50 }}>
              <h2>05 June 2020</h2>
            </div>
            <div class="row">
              <CardGroup>
                <Card style={{ width: 300 }}>
                  <Card.Body>
                    <Card.Title>Confirmation #XR3f4</Card.Title>
                    <Card.Text>
                      <b>Guest:</b> Karen Smith
                      <br />
                      <b>Number of Guests:</b> 3<br />
                      <b>Total Cost:</b> $34
                    </Card.Text>
                    <Card.Link class="view-booking-btn" href="#">
                      VIEW BOOKING
                    </Card.Link>
                  </Card.Body>
                </Card>

                <Card style={{ width: 300 }}>
                  <Card.Body>
                    <Card.Title>Confirmation #XR3f4</Card.Title>
                    <Card.Text>
                      <b>Guest:</b> Karen Smith
                      <br />
                      <b>Number of Guests:</b> 3<br />
                      <b>Total Cost:</b> $34
                    </Card.Text>
                    <Card.Link class="view-booking-btn" href="#">
                      VIEW BOOKING
                    </Card.Link>
                  </Card.Body>
                </Card>
              </CardGroup>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ViewBookingsAsGuideComponent;
