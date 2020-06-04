import React, { Component } from "react";
import { Container, Row, Col, Figure, Button } from "react-bootstrap";
import PublicService from "../api/PublicService";
import { Link } from "react-router-dom";
import AccountService from "../api/AccountService";
import Review from "./ReviewComponent";
import MobileDetect from "mobile-detect";
import Carousel from "react-multi-carousel";
import CondensedTour from "./CondensedTourComponent";
import "../style.css";
import "react-multi-carousel/lib/styles.css";
import StarRatingComponent from "react-star-rating-component";
import DisputeResolutionModalComponent from "./DisputeResolutionModalComponent";
//https://www.npmjs.com/package/react-star-rating-component

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      tours: [],
      reviewList: [],
      tourReviews: [],
      open: false
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

  componentDidMount() {
    window.scrollTo(0, 0);

    const id = this.props.match.params.id;

    let reviews = [];
    let filteredTours = [];

    PublicService.getUserByID(id).then(
      (response) => {
        // console.log(response);
        if (response.data.success) {
          this.setState({ user: response.data.profile });
          if (response.data.profile.type === "tourguide") {
            // this.setState({ tours: response.data.createdTours });
            response.data.createdTours.map((tour) =>
              reviews.push.apply(reviews, tour.allReviews)
            );

            response.data.createdTours.map((tour) => {
              if (tour.img) {
                if (tour.img.length > 0) {
                  filteredTours.push(tour);
                  console.log(filteredTours)
                }
              }
            });

            this.setState({tours: filteredTours})
            this.setState({ reviewList: reviews });
          } else {
            this.setState({ tourReviews: response.data.tourReviews });
          }
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
    this.props.history.push(`/tours/${tour_id}`);
  };

  goToReviewer = (user_id) => {
    this.props.history.push(`/account/show/${user_id}`);
  };

  handleClose = () => this.setState({ open: false });
  handleShow = () => this.setState({ open: true });

  render() {
    const id = this.props.match.params.id;
    const loggedIn = AccountService.getCurrentUser();

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
                <Col md={2}>
                  <Figure.Image
                    roundedCircle
                    fluid
                    style={{
                      objectFit: "cover",
                      width: "150px",
                      height: "150px",
                    }}
                    src={this.state.user.img}
                  />
                </Col>
                <Col>
                  <h1>Hi, I'm {this.state.user.firstName}</h1>
                  {this.state.user.type === "tourguide" && (
                    <>
                      <p style={{ color: "green", fontSize: "22px" }}>
                        TOUR GUIDE
                      </p>
                      <div className="rowC">
                        {this.state.user.ratings.toFixed(1)}
                        <StarRatingComponent
                          name="rating"
                          editing={false}
                          starCount={5}
                          value={Math.round(this.state.user.ratings)}
                        />
                      </div>
                    </>
                  )}
                  <p>
                    Languages Spoken:{" "}
                    {this.state.user.languagesSpoken.join(", ")}
                  </p>
                  {loggedIn && id === loggedIn._id && (
                    <Link
                      className="nav-link"
                      to={{ pathname: `/account/info` }}
                    >
                      Edit Profile
                    </Link>
                  )}
                  {loggedIn && id !== loggedIn._id && <Button size="sm" onClick={this.handleShow}>File a dispute</Button>}
                </Col>
              </Row>
              <hr />

              {this.state.user.type === "tourguide" && (
                <>
                  <Row>
                    <h3>Current Tours</h3>
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
                      {this.state.tours.map((tour) => {
                        return (
                          <div key={tour._id}>
                            <CondensedTour
                              isMoving={this.state.isMoving}
                              tour={tour}
                              goToTour={this.goToTour}
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  </Row>

                  {loggedIn && id === loggedIn._id && (
                    <Row>
                      <Button
                        style={{ marginRight: 20, marginLeft: "auto" }}
                        size="sm"
                        onClick={() =>
                          this.props.history.push(
                            `/tours/${loggedIn._id}/create`
                          )
                        }
                      >
                        Create New Tour
                      </Button>
                    </Row>
                  )}
                  <hr />
                </>
              )}

              {this.state.user.type === "tourguide" && (
                <>
                  <Row>
                    <h3>Reviews</h3>
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
                      {this.state.reviewList.map((review) => {
                        return (
                          <div key={review._id}>
                            <Review
                              isMoving={this.state.isMoving}
                              review={review}
                              goToReviewer={this.goToReviewer}
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  </Row>
                </>
              )}

              {this.state.user.type === "tourist" && (
                <>
                  <Row>
                    <h3>{this.state.user.firstName}'s Reviews</h3>
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
                      {this.state.tourReviews.map((review) => {
                        return (
                          <div key={review._id}>
                            <Review
                              showTourInfo={true}
                              isMoving={this.state.isMoving}
                              review={review}
                              goToReviewer={this.goToReviewer}
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  </Row>
                </>
              )}
            </Container>
            <DisputeResolutionModalComponent open={this.state.open} userID={loggedIn?._id} guideID={this.state.user._id} close={this.handleClose} onHide={this.handleClose} against={this.state.user}/>
          </div>  
        )}
        
      </>
    );
  }
}

export default ProfileComponent;
