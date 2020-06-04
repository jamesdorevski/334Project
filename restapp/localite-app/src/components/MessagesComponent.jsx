import React, { Component } from "react";
import AccountService from "../api/AccountService";
import { Container, Row, Col, Button } from "react-bootstrap";
import MessageService from "../api/MessageService";

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
    const loggedIn = AccountService.getCurrentUser();

    let messageArray = [];
    MessageService.getAllConvos(loggedIn._id).then(
      (response) => {
        if (response.data.success) {
          response.data.allConvos.map((content) => {
            messageArray.push({
              convoID: content.users[0]._id,
              id: content.users[0].firstName + " " + content.users[0].lastName,
              messages: content.messages,
            });
          });

          this.setState({
            messages: messageArray,
            chosen: messageArray[0],
          });
        }
      },
      (error) => {}
    );
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const loggedIn = AccountService.getCurrentUser();

    // console.log(this.state.value);
    const message = {
      sender: { _id: loggedIn._id },
      content: this.state.value,
    };

    // //update messages for other user
    MessageService.sendMessage(
      loggedIn._id,
      this.state.chosen.convoID,
      this.state.value
    ).then((response) => {
      if (response.data.success) {
        //reload messages from database
      }
    });
    this.setState({ value: "" });

    this.state.chosen.messages.push(message);
    event.preventDefault();
  };

  render() {
    const loggedIn = AccountService.getCurrentUser();
    console.log(this.state.chosen);

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
          {this.state.chosen.messages && (
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
                  <div class="overflow-auto" style={{ maxHeight: "320px" }}>
                    {this.state.chosen.messages.map((message) => (
                      <>
                        {message.sender._id !== loggedIn._id && (
                          <div style={{ display: "table" }}>
                            <p
                              style={{
                                background: "grey",
                                overflowWrap: "break-word",
                                maxWidth: "600px",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "50px 50px 50px 5px",
                              }}
                            >
                              {message.content}
                            </p>
                          </div>
                        )}
                        {message.sender._id === loggedIn._id && (
                          <div
                            style={{
                              display: "table",
                              marginRight: "0px",
                              marginLeft: "auto",
                            }}
                          >
                            <p
                              style={{
                                background: "#fc6008",
                                overflowWrap: "break-word",
                                maxWidth: "600px",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "50px 50px 5px 50px",
                              }}
                            >
                              {message.content}
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
          )}
        </div>
      </>
    );
  }
}

export default MessagesComponent;
