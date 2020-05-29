import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import wine from "../../images/wine.jpg";
import art from "../../images/art.jpg";
import horses from "../../images/horses.jpg";
//hover animation - gonna work on this later
import ImageContentHover from "react-image-hover";

class PopularComponent extends Component {
  render() {
    return (
      <section className="py-1">
        <div
          className="container"
          background-color="transparent"
          style={{ paddingBottom: "50px" }}
        >
          <center>
            <h2 style={{ padding: "20px" }}>Popular Experiences</h2>
          </center>
          <CardDeck>
            <Card
              hoverable="true"
              //we will eventually onclick to go to the page with that specific Tour info
              onClick={() => alert("Wine Tasting")}
            >
              <Card.Img variant="top" src={wine} />
              <Card.Body>
                <Card.Title>
                  <center>
                    Wine Tasting •{" "}
                    <i style={{ fontWeight: "lighter" }}>Florence, Italy</i>
                  </center>
                </Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card hoverable="true" onClick={() => alert("Street Art")}>
              <Card.Img variant="top" src={art} />
              <Card.Body>
                <Card.Title>
                  <center>
                    Street Art Tour •{" "}
                    <i style={{ fontWeight: "lighter" }}>
                      Melbourne, Australia
                    </i>
                  </center>
                </Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card hoverable="true" onClick={() => alert("Horseback Riding")}>
              <Card.Img variant="top" src={horses} />
              <Card.Body>
                <Card.Title>
                  <center>
                    Horseback Riding •{" "}
                    <i style={{ fontWeight: "lighter" }}>Hume, Virginia</i>
                  </center>
                </Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      </section>
    );
  }
}

export default PopularComponent;
