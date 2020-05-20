import React, { Component } from "react";

class DisputeResolutionComponent extends Component {
  componentWillMount = () => {};

  render() {
    return (
      <>
        <header></header>
        <hr
          style={{
            margin: "-2px",
          }}
        />
        <section className="py-1">
          <h2 style={{ padding: "20px" }}>Dispute Resolution</h2>
          <div
            style={{ textAlign: "left" }}
            className="container"
            background-color="transparent"
          ></div>
        </section>
      </>
    );
  }
}

export default DisputeResolutionComponent;
