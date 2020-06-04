import React, { Component } from "react";
import search from "../../images/search.png";
import connect from "../../images/connect.png";
import book from "../../images/book.png";
import experience from "../../images/experience.png";
import { Typography } from "@material-ui/core";

class WorksComponent extends Component {
  render() {
    const h = "125px";
    return (
      <section className="py-1">
        <div
          className="container"
          background-color="transparent"
          style={{ marginTop: "-20px" }}
        >
          <center>
            <h2 style={{ padding: "20px" }}>How It Works</h2>

            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col">
                <img
                  src={search}
                  height={h}
                  className="d-inline-block align-top"
                  alt="search"
                />
                <Typography
                  className="text-uppercase"
                  style={{ fontWeight: 500, fontSize: 28, padding: "10px" }}
                >
                  Search
                </Typography>
                <h6>Search for a tour with our lorem ipsum dolor sit</h6>
              </div>
              <div className="col">
                <img
                  src={connect}
                  height={h}
                  className="d-inline-block align-top"
                  alt="connect"
                />
                <Typography
                  className="text-uppercase"
                  style={{ fontWeight: 500, fontSize: 28, padding: "10px" }}
                >
                  Connect
                </Typography>
                <h6>Connect with a tour guide lorem ipsum dolor sit</h6>
              </div>
              <div className="col">
                <img
                  src={book}
                  height={h}
                  className="d-inline-block align-top"
                  alt="book"
                />
                <Typography
                  className="text-uppercase"
                  style={{ fontWeight: 500, fontSize: 28, padding: "10px" }}
                >
                  Book
                </Typography>
                <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h6>
              </div>
              <div className="col">
                <img
                  src={experience}
                  height={h}
                  className="d-inline-block align-top"
                  alt="experience"
                />
                <Typography
                  className="text-uppercase"
                  style={{ fontWeight: 500, fontSize: 28, padding: "10px" }}
                >
                  Experience
                </Typography>
                <h6>Local culture lorem ipsum dolor sit amet, consectetur</h6>
              </div>
            </div>
          </center>
        </div>
      </section>
    );
  }
}

export default WorksComponent;
