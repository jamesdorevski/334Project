import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import wine from "../../images/wine.jpg";
import art from "../../images/art.jpg";
import horses from "../../images/horses.jpg";
import PublicService from "../../api/PublicService";

class PopularComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threeTours: []
    };
  }

  componentDidMount() {
    PublicService.threeTours().then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({
            threeTours: response.data.tours,
          });
        } else {
          this.setState({
            threeTours: [],
          });
        }
      },
      (error) => {
        this.setState({
          threeTours: [],
        });
      }
    );
  }

  render() {
    return (
      <section className="py-1">
        <div
          className="container"
          background-color="transparent"
          style={{ paddingBottom: "50px" }}
        >
            <h2 style={{ padding: "20px" }}>Popular Experiences</h2>
          <CardDeck>
          {this.state.threeTours.map((tour) => {
                        return (
                          <Card
                          key={tour._id}
              hoverable="true"
              //we will eventually onclick to go to the page with that specific Tour info
              onClick={() => this.props.goToTour(tour._id)}
            >
              <Card.Img variant="top" src={tour.img[0]} style={{height: "250px", objectFit: "cover"}}/>
              <Card.Body>
                <Card.Title>

            {tour.name} •{" "}
            <i style={{ fontWeight: "lighter" }}>{tour.location.city}, {tour.location.country}</i>
                </Card.Title>
                <Card.Text>
                {tour.description.substring(0, 100)}...
                </Card.Text>
              </Card.Body>
            </Card>
                        );
                      })}


            {/* <Card
              hoverable="true"
              //we will eventually onclick to go to the page with that specific Tour info
              onClick={() => alert("Wine Tasting")}
            >
              <Card.Img variant="top" src={wine} />
              <Card.Body>
                <Card.Title>

                    Wine Tasting •{" "}
                    <i style={{ fontWeight: "lighter" }}>Florence, Italy</i>
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

                    Street Art Tour •{" "}
                    <i style={{ fontWeight: "lighter" }}>
                      Melbourne, Australia
                    </i>
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
                    Horseback Riding •{" "}
                    <i style={{ fontWeight: "lighter" }}>Hume, Virginia</i>
                </Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </Card.Text>
              </Card.Body>
            </Card> */}
          </CardDeck>
        </div>
      </section>
    );
  }
}

export default PopularComponent;
