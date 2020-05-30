import React, { Component } from "react";
import AccountService from "../api/AccountService";
import { Container, Row, Col, Button } from "react-bootstrap";
import PublicService from "../api/PublicService";

class MessagesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      messages: [],
      chosen: {},
    };
  }

  componentWillMount() {
    //call backend to load messages for loggedIn user
    // const loggedIn = AccountService.getCurrentUser();
    // let name = "";
    // PublicService.getUserByID("5ec560a17b05e02bc1105411").then((response) => {
    //   name = response.data.user.firstName;
    //   console.log(name);
    // });

    const hardcoded_messages = [
      {
        //daniel
        id: "5ec560a17b05e02bc1105411",
        messages: [
          {
            sender: "5ec560a17b05e02bc1105411",
            message: "Hey, I have a question.",
          },
          {
            sender: "5ecd6001b05e2348c7a6893f",
            message: "Hey, what's up",
          },
          {
            sender: "5ec560a17b05e02bc1105411",
            message: "Do your tours include time for travel.",
          },
        ],
      },

      //poppy
      {
        id: "5ec560907b05e02bc1105410",
        messages: [
          {
            sender: "5ec560907b05e02bc1105410",
            message: "Hi Emily, I am interested in your tour.",
          },
          {
            sender: "5ec560907b05e02bc1105410",
            message: "I was wondering if it's good for kids",
          },
          {
            sender: "5ecd6001b05e2348c7a6893f",
            message: "Hi yes, they are great for kids.",
          },
        ],
      },
    ];

    this.setState({
      messages: hardcoded_messages,
      chosen: hardcoded_messages[0],
    });
    // AccountService.loadUserMessages(loggedIn._id).then(
    //   (response) => {
    //     console.log(response);
    //     if (response.data.success) {
    //       this.setState({ messages: response.data.messages });
    //     } else {
    //       this.props.history.push("/");
    //     }
    //   },
    //   (error) => {
    //     this.props.history.push("/");
    //   }
    // );
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const loggedIn = AccountService.getCurrentUser();

    console.log(this.state.value);
    const message = {
      sender: loggedIn._id,
      message: this.state.value,
    };

    this.setState({ value: "" });

    // //update messages for other user
    // AccountService.addMessage().then(
    //   (response) => {
    //     if (response.data.success) {
    //       //reload messages from database
    //     }
    //   }
    // )
    this.state.chosen.messages.push(message);
    event.preventDefault();
  };

  render() {
    const loggedIn = AccountService.getCurrentUser();

    return (
      <>
        <hr
          style={{
            margin: "-2px",
          }}
        />

        <div
          style={{ textAlign: "left", padding: "10px" }}
          className="container"
          background-color="transparent"
        >
          <h3>Messages</h3>
          <hr />
          <Container style={{ height: "360px" }}>
            <Row>
              <Col sm={4} style={{ background: "#f8f9fa", height: "360px" }}>
                <div class="overflow-auto" style={{ height: "360px" }}>
                  {this.state.messages.map((user) => (
                    <div key={user.id}>
                      {user.id === this.state.chosen.id && (
                        <Button
                          onClick={() => this.setState({ chosen: user })}
                          variant="dark"
                          style={{ width: "100%", borderRadius: 0 }}
                        >
                          {user.id}
                        </Button>
                      )}
                      {user.id !== this.state.chosen.id && (
                        <Button
                          onClick={() => this.setState({ chosen: user })}
                          variant="light"
                          style={{ width: "100%", borderRadius: 0 }}
                        >
                          {user.id}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Col>

              <Col sm={8}>
                <div
                  class="overflow-auto"
                  style={{ maxHeight: "320px" }}
                >
                  {this.state.chosen.messages.map((message) => (
                    <>
                      {/* {message.sender} | {loggedIn._id} */}
                      {message.sender !== loggedIn._id && (
                        <div style={{ display: "table" }}>
                          <p
                            style={{
                              background: "grey",
                              overflowWrap: "break-word",
                              maxWidth: "600px",
                              padding: "10px",
                              marginBottom: "10px",
                              borderRadius: "50px 50px 50px 5px"
                            }}
                          >
                            {message.message}
                          </p>
                        </div>
                      )}
                      {message.sender === loggedIn._id && (
                        <div style={{ display: "table", marginRight: "0px",
                        marginLeft: "auto"}}>
                          <p
                            style={{
                              background: "#fc6008",
                              overflowWrap: "break-word",
                              maxWidth: "600px",
                              padding: "10px",
                              marginBottom: "10px",
                              borderRadius: "50px 50px 5px 50px"
                            }}
                          >
                            {message.message}
                          </p>
                        </div>
                      )}
                    </>
                  ))}
                </div>

                <div style={{ bottom: 0, position: "absolute" }}>
                  <input
                    name="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={{ width: "560px", height: "45px" }}
                  />
                  <Button
                    type="button"
                    class="btn btn-primary btn-sm"
                    disabled={!this.state.value}
                    onClick={this.handleSubmit}
                  >
                    Send Message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default MessagesComponent;
