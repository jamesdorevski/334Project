import React, { Component } from "react";
import { Container, Row, Col, Figure, Button } from "react-bootstrap";
import PublicService from "../api/PublicService";
import MobileDetect from "mobile-detect";
//new
import Carousel from "react-multi-carousel";
import CondensedTour from "./CondensedTourComponent";
import "../style.css";
import "react-multi-carousel/lib/styles.css";

class MyBookingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  static getInitialProps({ req }) {
    let userAgent;
    let deviceType;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
      deviceType = "tablet";
    } else if (md.mobile()) {
      deviceType = "mobile";
    } else {
      deviceType = "desktop";
    }
    return { deviceType };
  }

  state = { isMoving: false };

  componentWillMount() {
    const id = this.props.match.params.id;

    PublicService.getUserByID(id).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({ user: response.data.user });
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
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };

    return (
      <>
        <hr
          style={{
            margin: "-2px",
          }}
        />
        {this.state.user && (
          <div
            style={{ textAlign: "left", padding: "10px" }}
            className="container"
            background-color="transparent"
          >
            <Container fluid>
              <Row>
                <h3>Upcoming Bookings</h3>
              </Row>
              <Row>
                <Carousel
                  responsive={responsive}
                  ssr
                  infinite={false}
                  beforeChange={() => this.setState({ isMoving: true })}
                  afterChange={() => this.setState({ isMoving: false })}
                  containerClass="first-carousel-container container"
                  deviceType={this.props.deviceType}
                >
                  {this.state.user.createdTours.map((tour) => {
                    return (
                      <div key={tour._id}>
                        <CondensedTour
                          isMoving={this.state.isMoving}
                          tour={tour}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </Row>
              <Row>
                <h3>Past Bookings</h3>
              </Row>
              <Row>
                <Carousel
                  responsive={responsive}
                  ssr
                  infinite={false}
                  beforeChange={() => this.setState({ isMoving: true })}
                  afterChange={() => this.setState({ isMoving: false })}
                  containerClass="first-carousel-container container"
                  deviceType={this.props.deviceType}
                >
                  {this.state.user.createdTours.map((tour) => {
                    return (
                      <div key={tour._id}>
                        <CondensedTour
                          isMoving={this.state.isMoving}
                          tour={tour}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </Row>
            </Container>
          </div>
        )}
      </>
    );
  }
}

export default MyBookingsComponent;
