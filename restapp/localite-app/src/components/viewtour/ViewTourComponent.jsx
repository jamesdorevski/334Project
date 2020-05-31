import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import bluemountains_cropped from "../../images/bluemountains_cropped.png";
import bluemountains2_cropped from "../../images/bluemountains2_cropped.png";
import brittney from "../../images/brittney.jpg";
import corndog from "../../images/corndog.PNG";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import forest from "../../images/forest.jpg";
import sterre from "../../images/sterre.jpg";
import borealis from "../../images/borealis.jpg";
import TourService from "../../api/TourService";
import StarRatingComponent from "react-star-rating-component";
import Typography from "@material-ui/core/Typography";

class ViewTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: null,
    };
  }

  componentWillMount() {
    const id = this.props.match.params.id;

    TourService.getTour(id).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({ tour: response.data.profile });
        } else {
          this.props.history.push("/");
        }
      },
      (error) => {
        this.props.history.push("/");
      }
    );
  }

  render() {
    return (
      <div>
        <center>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-75"
                src={bluemountains_cropped}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-75"
                src={bluemountains2_cropped}
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>

          <div style={{ paddingBottom: "10px" }}>
            <div class="container" align="left">
              <div class="row">
                {/* tour title */}
                <h1 style={{ paddingTop: 30 }}>{this.state.tour.name}}</h1>
              </div>
              <div class="row">
                {/* tour location */}
                <h2 style={{ paddingBottom: 30 }}>
                  {this.state.tour.location}
                </h2>
              </div>
              <div class="row">
                <div class="col-8">
                  <p style={({ paddingTop: 20 }, { paddingBottom: 20 })}>
                    {this.state.tour.description}
                    {/* Experience the best hike in all of Sydney. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum. */}
                  </p>

                  {/* tour categories */}
                  {this.state.tour.tags.map((tag) => (
                    <div key={tag} className="tour-tag">
                      <Typography
                        className="text-uppercase"
                        style={{ fontSize: 12 }}
                      >
                        {tag}
                      </Typography>
                    </div>
                  ))}

                  {/* lists */}
                  <h4 style={{ paddingTop: 30 }}>What's Included</h4>
                  <ul>
                    <li>Complimentary lunch</li>
                    <li>"Blue Mountains" t-shirt</li>
                    <li>"Blue Mountains" fridge magnet</li>
                  </ul>

                  <h4>What to Bring</h4>
                  <ul>
                    <li>Water</li>
                    <li>Small snacks</li>
                    <li>Camera</li>
                    <li>A willingness to explore</li>
                  </ul>
                </div>

                {/* tour guide information */}
                <div class="col">
                  <h4>Meet Your Guide</h4>
                  <center>
                    {/* profile pic */}
                    <img
                      class="guide-avatar"
                      src={this.state.tour.tourGuide.img}
                    />
                    <h5>{this.state.tour.tourGuide.firstName}</h5>
                    <p>{this.state.tour.tourGuide.rating}</p>
                    <StarRatingComponent
                      name="star"
                      editing={false}
                      starCount={1}
                      value={1}
                    />
                  </center>
                  {/* guide description/bio */}
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>

                  <p>
                    Languages Spoken:{" "}
                    {this.state.user.languagesSpoken.join(", ")}
                  </p>

                  <center>
                    <button class="guide-msg-button">Message Joe</button>
                  </center>
                </div>
              </div>

              <button class="book-tour-button">
                Book For ${this.state.tour.basePrices.adult}
              </button>

              {/* REVIEW SECTION */}
              <div class="container" align="left">
                <div class="row">
                  <h2>Tourist Reviews</h2>
                </div>
                <div class="row" style={{ paddingBottom: 30 }}>
                  <h4>
                    <StarRatingComponent
                      name="star"
                      editing={false}
                      starCount={5}
                      value={Math.round(this.state.tour.ratings)}
                    />
                    {this.state.tour.ratings} (
                    {this.state.tour.allReviews.length()})
                  </h4>
                </div>
              </div>

              {/* <div class="container" align="left" style={{ width: 800 }}>
                <img class="user-review" src={brittney} />
                <h5 class="review-title">Amazing trip!</h5>
                ★ ★ ★ ★ ★<br />
                <b>Brittney</b> • February 8, 2020
                <br />
                <p class="user-review-txt">
                  We had a great time with Joe. My wife and two kids lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum.
                </p>
              </div> */}

              {this.state.tour.allReviews.map((review) => {
                return (
                  <div
                    key={review._id}
                    class="container"
                    align="left"
                    style={{ width: 800 }}
                  >
                    <h5 class="review-title">Cool mountains but no corndogs</h5>
                  </div>
                );
              })}

              <button class="guide-msg-button" style={{ marginRight: 30 }}>
                See More Reviews
              </button>
              <button class="guide-msg-button">Leave a Review</button>

              <h2 style={({ paddingBottom: 20 }, { paddingTop: 100 })}>
                Similar Tours
              </h2>
              <div class="container" style={{ paddingBottom: 150 }}>
                <div class="row">
                  <CardDeck>
                    <Card>
                      <Card.Img
                        class="card-img-top2"
                        variant="top"
                        src={borealis}
                      />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Img
                        class="card-img-top2"
                        variant="top"
                        src={forest}
                      />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This card has supporting text below as a natural
                          lead-in to additional content.{" "}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Img
                        class="card-img-top2"
                        variant="top"
                        src={sterre}
                      />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This card has
                          even longer content than the first to show that equal
                          height action.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default ViewTour;
