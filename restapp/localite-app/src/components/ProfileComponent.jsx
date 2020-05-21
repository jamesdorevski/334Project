import React, { Component } from "react";
import { Container, Row, Col, Figure, Button } from "react-bootstrap";
import PublicService from "../api/PublicService";
import { Link } from "react-router-dom";

class ProfileComponent extends Component {
  constructor(props){
    super(props)
    this.state={
      user: null
    }
  }

  componentWillMount() {
    const id = this.props.match.params.id;

    PublicService.getUserByID(id).then((response) => {
      console.log(response)
      if (response.data.success) {
        this.setState({user: response.data.user})
        
      } else {
        this.props.history.push("/")
      }
    },
    (error) => {
      this.props.history.push("/")
    }
    );
  }

  render() {
    const id = this.props.match.params.id;

    return (
      <>
      <hr
          style={{
            margin: "-2px",
          }}
        />
        {this.state.user && <div
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
                <h1>Hi, I'm {this.state.user.firstName}</h1>
                {/* <p>Languages Spoken: {user.languagesSpoken.join(", ")}</p> */}
                {id === this.state.user._id && (
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
           
            {id === this.state.user._id && (<Row>
            <Button style={{"margin-right": 20, "margin-left": "auto"}} size="sm">Create New Tour</Button>
            </Row>)}
            
            <hr />
            <Row>
              <h3>Reviews</h3>
            </Row>
          </Container>
        </div>}
      </> 
    );
  }
}

export default ProfileComponent;
