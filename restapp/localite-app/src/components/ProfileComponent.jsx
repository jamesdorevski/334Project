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
import StarRatingComponent from 'react-star-rating-component';
//https://www.npmjs.com/package/react-star-rating-component

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      tours: [],
      reviewList: [],
      tourReviews: []
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

    let reviews = [];
    
    PublicService.getUserByID(id).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({ user: response.data.profile });
          this.setState({ tours: response.data.createdTours });
          this.setState({ tourReviews: response.data.tourReviews});
          response.data.createdTours.map((tour) =>
            reviews.push.apply(reviews, tour.allReviews)
          )
          this.setState({ reviewList: reviews });
        } else {
          this.props.history.push("/");
        }
      },
      (error) => {
        this.props.history.push("/");
      }
    );
  }

  // reviewStars(num) {
  //   let stars = [];
  //   for (let i = 0; i < num; i++) {
  //     stars.push(
  //       <img
  //         key={i}
  //         style={{
  //           width: "18px",
  //           height: "18px",
  //           marginBottom: "5px",
  //           marginLeft: "5px",
  //         }}
  //         src={require("../images/star.png")}
  //         alt="star"
  //       />
  //     );
  //   }
  //   return <div>{stars}</div>;
  // }

  goToTour = (tour_id) => {
    this.props.history.push(`/tours/${tour_id}`)
  };

  render() {
    const id = this.props.match.params.id;
    const loggedIn = AccountService.getCurrentUser();
    console.log(this.state.reviewList)
   
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

    //TEMP: this will be pulled from backend
    // const reviews = [
    //   {
    //     _id: "523tkwneofwr2r5823",
    //     title: "Great tour!",
    //     reviewer: { firstName: "Karen", img: require("../images/profile.jpg") },
    //     dateCreated:
    //       monthNames[date.getMonth()] +
    //       " " +
    //       date.getDate().toString() +
    //       ", " +
    //       date.getFullYear().toString(),
    //     description:
    //       "Such a fun class. the information about propagating different types of plants was so helpful. now i'm off to turn my current plant family into a bigger one!",
    //   },
    //   {
    //     _id: "523tkwneofwr2r5824",
    //     title: "Had a great time with my family",
    //     reviewer: {
    //       firstName: "Josiah",
    //       img: require("../images/profile.jpg"),
    //     },
    //     dateCreated:
    //       monthNames[date.getMonth()] +
    //       " " +
    //       date.getDate().toString() +
    //       ", " +
    //       date.getFullYear().toString(),
    //     description:
    //       "Educational, immersive, fun. Whether you're a rookie plant parent or expert, you'll have a great time and find some pointers to take away.",
    //   },
    //   {
    //     _id: "523tkwneofwr2r5825",
    //     title: "Loved it!",
    //     reviewer: {
    //       firstName: "Maggie",
    //       img: require("../images/profile.jpg"),
    //     },
    //     dateCreated:
    //       monthNames[date.getMonth()] +
    //       " " +
    //       date.getDate().toString() +
    //       ", " +
    //       date.getFullYear().toString(),
    //     description:
    //       "Educational, immersive, fun. Whether you're a rookie plant parent or expert, you'll have a great time and find some pointers to take away.",
    //   },
    //   {
    //     _id: "523tkwneofwr2r5826",
    //     title: "Loved the tour",
    //     reviewer: {
    //       firstName: "Patrick",
    //       img: require("../images/profile.jpg"),
    //     },
    //     dateCreated:
    //       monthNames[date.getMonth()] +
    //       " " +
    //       date.getDate().toString() +
    //       ", " +
    //       date.getFullYear().toString(),
    //     description:
    //       "Educational, immersive, fun. Whether you're a rookie plant parent or expert, you'll have a great time and find some pointers to take away.",
    //   },
    // ];

    //TEMP
    // const tempTours = [
    //   {
    //     tourName: "Backpacking in the Blue Mountains",
    //     _id: 0,
    //     tourGuide: {
    //       firstName: "James",
    //       img: require("../images/james.jpg"),
    //       rating: 4.7,
    //     },
    //     description: "Description of Backpacking in the Blue Mountains",
    //     basePrice: 90,
    //     img: require("../images/mountains.jpg"),
    //     tags: ["Outdoors", "Day Trip"],
    //   },
    //   {
    //     tourName: "Food Tour of Sydney",
    //     _id: 1,
    //     tourGuide: {
    //       firstName: "Josh",
    //       img: require("../images/josh.jpg"),
    //       rating: 4.5,
    //     },
    //     description: "Description of Food Tour of Sydney",
    //     basePrice: 85,
    //     img: require("../images/foodtour.jpg"),
    //     tags: ["Food", "Kid-friendly", "Private Tours Available"],
    //   },
    //   {
    //     tourName: "Day Hike - Sydney Harbour National Park",
    //     _id: 2,
    //     tourGuide: {
    //       firstName: "Andrea",
    //       img: require("../images/andrea.jpg"),
    //       rating: 4.8,
    //     },
    //     description: "Description of Day Hike - Sydney Harbour National Park",
    //     basePrice: 50,
    //     img: require("../images/sydney-harbour.jpg"),
    //     tags: ["Outdoors", "Day Trip"],
    //   },
    // ];

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
                      editing={false}
          starCount={5}
          value={Math.round(this.state.user.rating)}
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
                        onClick={() => this.props.history.push(`/tours/${loggedIn._id}/create`)}
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
                              isMoving={this.state.isMoving}
                              review={review}
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  </Row>
                </>
              )}
            </Container>
          </div>
        )}
      </>
    );
  }
}

export default ProfileComponent;
