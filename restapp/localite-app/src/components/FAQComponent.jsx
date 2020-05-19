import React, { Component } from "react";
import plane2 from "../images/plane2.jpg";

class FAQComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  componentWillMount = () => {
    //will pull questions from backend
    const static_questions = {
      "Question lorem ipsum dolor sit amet, consectetur adipiscing elit?":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Question lorem ipsum dolor sit amet, consectetur?":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Question lorem ipsum dolor sit amet, consectetur adipiscing?":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    };

    this.setState({ questions: static_questions });
  };

  render() {
    return (
      <>
        <header
          className="masthead"
          style={{ backgroundImage: `url(${plane2})`, height: "10vh" }}
        >
          <h1 className="masthead_text" style={{ height: "10vh" }}>
            Frequently Asked Questions
          </h1>
        </header>
        <section className="py-1">
          <div
            style={{ textAlign: "left", padding: "20px" }}
            className="container"
            background-color="transparent"
          >
            {Object.entries(this.state.questions).map(([question, answer]) => (
              <div key={question} style={{ paddingBottom: "20px" }}>
                <h5>{question}</h5>
                <p>{answer}</p>
              </div>
            ))}
            <hr />
          </div>
        </section>
      </>
    );
  }
}

export default FAQComponent;
