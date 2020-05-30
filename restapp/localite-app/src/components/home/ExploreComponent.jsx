import React, { Component } from "react";
import MobileDetect from "mobile-detect";
import { Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "../../style.css";
import "react-multi-carousel/lib/styles.css";
import { Typography } from "@material-ui/core";

class ExploreComponent extends Component {
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

  render() {
    const experiences = [
      { title: "Food", img: require("../../images/food.jpg") },
      { title: "Kid-friendly", img: require("../../images/kids.jpg") },
      { title: "Hiking and Outdoors", img: require("../../images/hiking.jpg") },
      { title: "Wine Tasting", img: require("../../images/wine_tasting.jpg") },
      { title: "Museums", img: require("../../images/museum.jpg") },
      { title: "Day Trip", img: require("../../images/day.jpg") },
      {
        title: "Wheelchair Accessible",
        img: require("../../images/wheelchair.jpg"),
      },
      {
        title: "Nature and Wildlife",
        img: require("../../images/wildlife.jpg"),
      },
      { title: "Shopping", img: require("../../images/shopping.jpg") },
      { title: "Night Tour", img: require("../../images/night.jpg") },
    ];

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 5,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 1,
      },
    };

    return (
      <section className="py-1">
        <div style={{ paddingTop: "10px" }}>
          <h2 style={{ padding: "20px" }}>Explore Our Experiences</h2>
          <Carousel
            responsive={responsive}
            ssr
            infinite={false}
            beforeChange={() => this.setState({ isMoving: true })}
            afterChange={() => this.setState({ isMoving: false })}
            containerClass="first-carousel-container container"
            deviceType={this.props.deviceType}
          >
            {experiences.map((card) => {
              return (
                <div key={card.title}>
                  <Card style={{ width: "200px", height: "150px" }}>
                    <Card.Img
                      variant="top"
                      src={card.img}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  </Card>
                  <Typography
                    className="text-uppercase"
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      paddingRight: "30px",
                      paddingTop: "10px",
                    }}
                  >
                    {card.title}
                  </Typography>
                </div>
              );
            })}
          </Carousel>
        </div>
      </section>
    );
  }
}

export default ExploreComponent;
