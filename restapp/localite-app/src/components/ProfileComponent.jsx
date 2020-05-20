import React, { Component } from "react";
import { Container, Row, Col, Figure, Button } from "react-bootstrap";
import AccountService from "../api/AccountService";
import { Link } from "react-router-dom";

class ProfileComponent extends Component {
  componentDidMount = () => {};

  render() {
    //user will be getUserByID(id)
    const id = this.props.match.params.id;
    const user = AccountService.getCurrentUser();

    return (
      <>
        <div
          style={{ textAlign: "left", padding: "10px" }}
          className="container"
          background-color="transparent"
        >
          <Container fluid>
            <Row>
              <Col md={2}>
                <Figure.Image
                  roundedCircle
                  fluid
                  width={150}
                  height={150}
                  src={require("../images/profile.jpg")}
                />
              </Col>
              <Col>
                <h1>Hi, I'm {user.firstName}</h1>
                <p>Languages Spoken: {user.languagesSpoken.join(", ")}</p>
                {id === user._id && (
                  <Link
                    className="nav-link"
                    to={{ pathname: `/account/info` }}
                  >
                    Edit Profile
                  </Link>
                )}
              </Col>
            </Row>
            <hr />
            <Row>
              <h3>Current Tours</h3>
              
            </Row>
           
            {id === user._id && (<Row>
            <Button style={{"margin-right": 20, "margin-left": "auto"}} size="sm">Create New Tour</Button>
            </Row>)}
            
            <hr />
            <Row>
              <h3>Reviews</h3>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default ProfileComponent;
