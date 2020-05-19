import React, { Component } from "react";
import SignUpComponent from "./SignUpComponent.jsx";
import guide from "../images/guide.jpg";

class BecomeAGuideComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <header
          className="masthead"
          style={{ backgroundImage: `url(${guide})`, height: "10vh" }}
        >
          <h1 className="masthead_text" style={{ height: "10vh" }}>
            Become a Guide
          </h1>
        </header>
        <div style={{ padding: "20px" }}>
          <section className="py-1">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <SignUpComponent />
          </section>
        </div>
      </>
    );
  }
}

export default BecomeAGuideComponent;
