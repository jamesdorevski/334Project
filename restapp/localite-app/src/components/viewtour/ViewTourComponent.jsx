import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import bluemountains_cropped from "../../images/bluemountains_cropped.png";
import bluemountains2_cropped from "../../images/bluemountains2_cropped.png";
import joe from "../../images/joe.jpg";
import brittney from "../../images/brittney.jpg";
import corndog from "../../images/corndog.PNG";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import forest from "../../images/forest.jpg";
import sterre from "../../images/sterre.jpg";
import borealis from "../../images/borealis.jpg";

class ViewTour extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <center>
        <div>
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
        </div>

        {/* tour info */}
        <div style={{ paddingBottom: "10px" }}>
          <div class="container" align="left">
            <div class="row">
              {/* tour title */}
              <h1 style={{ paddingTop: 30 }}>Hiking in the Blue Mountains</h1>
            </div>
            <div class="row">
              {/* tour location */}
              <h2 style={{ paddingBottom: 30 }}>Sydney, Australia</h2>
            </div>
            <div class="row">
              <div class="col-8">
                <p style={({ paddingTop: 20 }, { paddingBottom: 20 })}>
                  Experience the best hike in all of Sydney. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum.
                </p>

                {/* tour categories */}
                <text class="tour-tag">family-friendly</text>
                <text class="tour-tag">outdoors</text>
                <text class="tour-tag">day trip</text>

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
                  <img class="guide-avatar" src={joe} />
                  <h5>Joe</h5>
                  <p>4.5 ★</p>
                </center>
                {/* guide description/bio */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p>
                  <b>Languages Spoken:</b> English, Español, 日本語
                </p>

                <center>
                  <button class="guide-msg-button">Message Joe</button>
                </center>
              </div>
            </div>
          </div>

          <button class="book-tour-button">Book For $90</button>

          {/* REVIEW SECTION */}
          <div class="container" align="left">
            <div class="row">
              <h2>Traveler Reviews</h2>
            </div>
            <div class="row" style={{ paddingBottom: 30 }}>
              <h4>★ ★ ★ ★ ★ 4.86 (20)</h4>
            </div>
          </div>

          <div class="container" align="left" style={{ width: 800 }}>
            <img class="user-review" src={brittney} />
            <h5 class="review-title">Amazing trip!</h5>
            ★ ★ ★ ★ ★<br />
            <b>Brittney</b> • February 8, 2020
            <br />
            <p class="user-review-txt">
              We had a great time with Joe. My wife and two kids lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div class="container" align="left" style={{ width: 800 }}>
            <img class="user-review" src={corndog} />
            <h5 class="review-title">Cool mountains but no corndogs</h5>
            ★ ★ ★ ★ ☆<br />
            <b>Hank</b> • February 8, 2020
            <br />
            <p class="user-review-txt">
              Joe was cool but there were no corndogs so that made me lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <button class="guide-msg-button" style={{ marginRight: 30 }}>
          See More Reviews
        </button>
        <button class="guide-msg-button">
          Leave a Review
        </button>

        <h2 style={({ paddingBottom: 20 }, { paddingTop: 100 })}>
          Similar Tours
        </h2>
        <div class="container" style={{ paddingBottom: 150 }}>
          <div class="row">
            <CardDeck>
              <Card>
                <Card.Img class="card-img-top2" variant="top" src={borealis} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img class="card-img-top2" variant="top" src={forest} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img class="card-img-top2" variant="top" src={sterre} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </div>
        </div>
      </center>
    );
  }
}

export default ViewTour;
