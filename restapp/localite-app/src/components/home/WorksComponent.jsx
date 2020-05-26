import React, { Component } from "react";
import search from "../../images/search.png";
import connect from "../../images/connect.png";
import book from "../../images/book.png";
import experience from "../../images/experience.png";

class WorksComponent extends Component {
  render() {
    return (
      <section className="py-1">
        <div className="container" background-color="transparent">
          <center>
            <h2 style={{ padding: "20px" }}>How It Works</h2>

            <div className="row" style={{paddingBottom:"80px"}}>
              <div className="col">
                <img
                  src={search}
                  height="150px"
                  className="d-inline-block align-top"
                  alt="search"
                />
                <h4 style={{ padding: "10px" }}>SEARCH</h4>
                <h6>Search for a tour with our lorem ipsum dolor sit</h6>
              </div>
              <div className="col">
                <img
                  src={connect}
                  height="150px"
                  className="d-inline-block align-top"
                  alt="connect"
                />
                <h4 style={{ padding: "10px" }}>CONNECT</h4>
                <h6>Connect with a tour guide lorem ipsum dolor sit</h6>
              </div>
              <div className="col">
                <img
                  src={book}
                  height="150px"
                  className="d-inline-block align-top"
                  alt="book"
                />
                <h4 style={{ padding: "10px" }}>BOOK</h4>
                <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h6>
              </div>
              <div className="col">
                <img
                  src={experience}
                  height="150px"
                  className="d-inline-block align-top"
                  alt="experience"
                />
                <h4 style={{ padding: "10px" }}>EXPERIENCE</h4>
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
