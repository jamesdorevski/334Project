import React, { Component } from "react"
import SignUpComponent from "./SignUpComponent.jsx"

class BecomeAGuideComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
        <h1>Become a Guide</h1>
        <SignUpComponent />
      </>
    );
  }
}

export default BecomeAGuideComponent;
