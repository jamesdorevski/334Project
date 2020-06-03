import React, { Component, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import bluemountains_cropped from "../images/bluemountains_cropped.png";
import forest from "../images/forest.jpg";

class ViewBookingsAsTouristComponent extends Component {
  render() {
    return (
      <>
        <div style={{ paddingBottom: 100 }}>
          <div className="container" align="left">
            <div class="row" style={{ paddingBottom: 50 }}>
              <h1>Upcoming Bookings</h1>
            </div>
            <div class="row">
              <CardGroup>
                <Card style={{ width:500 }}>
                  {/* tour title */}
                  <Card.Header as="h5">Blue Mountains Hiking Trip</Card.Header>
                  {/* take first tour image if u want */}
                  <Card.Img className="card-img-top3" variant="top" src={bluemountains_cropped} />
                  <Card.Body>
                    {/* tour date */}
                    <Card.Title>18 June 2020</Card.Title>
                    <Card.Text>
                      <b>Confirmation #94iakn</b><br/>
                      <b>Tour Guide:</b> John Smith<br/>
                      <b>Number of Guests:</b> 3<br />
                      <b>Price:</b> $34<br/>
                    </Card.Text>

                    <Card.Link class="view-booking-btn" href="#">
                      VIEW TOUR
                    </Card.Link>
                    <Card.Link class="view-booking-btn" href="#">
                      CONTACT GUIDE
                    </Card.Link>
                  </Card.Body>
                </Card>

                <Card style={{ width:500 }}>
                  {/* tour title */}
                  <Card.Header as="h5">Forest Hike</Card.Header>
                  {/* take first tour image if u want */}
                  <Card.Img className="card-img-top3" variant="top" src={forest} />
                  <Card.Body>
                    {/* tour date */}
                    <Card.Title>24 June 2020</Card.Title>
                    <Card.Text>
                      <b>Confirmation #Fa8zs</b><br/>
                      <b>Tour Guide:</b> Joe Shmoe<br/>
                      <b>Number of Guests:</b> 10<br />
                      <b>Price:</b> $18<br/>
                    </Card.Text>

                    <Card.Link class="view-booking-btn" href="#">
                      VIEW TOUR
                    </Card.Link>
                    <Card.Link class="view-booking-btn" href="#">
                      CONTACT GUIDE
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

export default ViewBookingsAsTouristComponent;
