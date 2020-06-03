import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import MobileDetect from "mobile-detect";
//new
import Carousel from "react-multi-carousel";
import "../style.css";
import "react-multi-carousel/lib/styles.css";
import AccountService from "../api/AccountService";
import ViewBookingsAsGuideComponent from "./ViewBookingsAsGuideComponent"

class MyToursComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTours: [],
      pastTours: []
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

    AccountService.getUserProfile(id).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({currentTours: response.data.currentTours,
          pastTours: response.data.pastTours})
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
        items: 3,
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
        
          <div
            style={{ textAlign: "left", padding: "10px" }}
            className="container"
            background-color="transparent"
          >
            <Container fluid>
              <Row>
                <h3>Upcoming Tours</h3>
              </Row>
              <Row>
                <h5>June 20, 2020</h5>
              <Carousel
                  responsive={responsive}
                  ssr
                  infinite={false}
                  beforeChange={() => this.setState({ isMoving: true })}
                  afterChange={() => this.setState({ isMoving: false })}
                  containerClass="first-carousel-container container"
                  deviceType={this.props.deviceType}
                >
                  {this.state.currentTours.map((tour) => {
                    return (
                      <div key={tour._id}>
                        <ViewBookingsAsGuideComponent tour={tour}/>
                      </div>
                    );
                  })}
                </Carousel>
                <h5>June 31, 2020</h5>
              <Carousel
                  responsive={responsive}
                  ssr
                  infinite={false}
                  beforeChange={() => this.setState({ isMoving: true })}
                  afterChange={() => this.setState({ isMoving: false })}
                  containerClass="first-carousel-container container"
                  deviceType={this.props.deviceType}
                >
                  {this.state.currentTours.map((tour) => {
                    return (
                      <div key={tour._id}>
                        <ViewBookingsAsGuideComponent tour={tour}/>
                      </div>
                    );
                  })}
                </Carousel>
              </Row>
              <Row>
                <h3>Past Tours</h3>
              </Row>
              <Row>
              <h5>May 15, 2020</h5>
              <Carousel
                  responsive={responsive}
                  ssr
                  infinite={false}
                  beforeChange={() => this.setState({ isMoving: true })}
                  afterChange={() => this.setState({ isMoving: false })}
                  containerClass="first-carousel-container container"
                  deviceType={this.props.deviceType}
                >
                  {this.state.currentTours.map((tour) => {
                    return (
                      <div key={tour._id}>
                        <ViewBookingsAsGuideComponent tour={tour}/>
                      </div>
                    );
                  })}
                </Carousel>
              </Row>
            </Container>
          </div>
      </>
    );
  }
}

export default MyToursComponent;
