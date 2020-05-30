import React, { Component } from "react";
import plane2 from "../images/plane2.jpg";
import PublicService from "../api/PublicService";
import Typography from "@material-ui/core/Typography";

class FAQComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };
  }

  componentWillMount = () => {
    // //will pull questions from backend
    // const static_questions = [
    //   {"question": "Question lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    //     "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    //   {"question": "Question lorem ipsum dolor sit amet, consectetur?",
    //     "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    //   {"question": "Question lorem ipsum dolor sit amet, consectetur adipiscing?",
    //   "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
    // ];

    PublicService.getFAQ().then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({
            questions: response.data.faqList,
            // questions: static_questions
          });
        } else {
          this.setState({
            questions: [],
          });
        }
      },
      (error) => {
        this.setState({
          questions: [],
        });
      }
    );
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
            {this.state.questions.map((question) => {
              return (
                <div key={question.question} style={{ paddingBottom: "20px" }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {question.question}
                  </Typography>
                  <p>{question.answer}</p>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

export default FAQComponent;
