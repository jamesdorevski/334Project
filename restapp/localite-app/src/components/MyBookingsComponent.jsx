import React, { Component } from "react";
import { Container, Row} from "react-bootstrap";
import AccountService from "../api/AccountService";
import MobileDetect from "mobile-detect";
//new
import Carousel from "react-multi-carousel";
import CondensedTour from "./CondensedTourComponent";
import "../style.css";
import "react-multi-carousel/lib/styles.css";
import { isThisSecond } from "date-fns/esm";
import ViewBookingsAsTouristComponent from "./ViewBookingsAsTouristComponent";
import MessageGuideComponent from "./MessageGuideComponent"

class MyBookingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBookings: [],
      pastBookings: []
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
          this.setState({currentBookings: response.data.currentBookings,
          pastBookings: response.data.pastBookings})
        } else {
          this.props.history.push("/");
        }
      },
      (error) => {
        this.props.history.push("/");
      }
    );
  }

  goToTour = (tour_id) => {
    this.props.history.push(`/tours/${tour_id}`)
  };

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
        
          <div
            style={{ textAlign: "left", padding: "10px", backgroundColor: "transparent" }}
            className="container"
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
                  {this.state.currentBookings.map((booking) => {
                    return (
                      <div key={booking._id}>
                        <ViewBookingsAsTouristComponent/>
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
                  {this.state.pastBookings.map((booking) => {
                    return (
                      <div key={booking._id}>
                        <ViewBookingsAsTouristComponent booking={booking} goToTour={this.goToTour}/>
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

export default MyBookingsComponent;
