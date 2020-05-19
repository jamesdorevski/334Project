import React, { Component } from "react";
import uow from "../images/uow.jpg";
import { Figure, Container, Row, Col } from "react-bootstrap";

class AboutUsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutInfo: null,
    };
  }

  componentDidMount = () => {};

  render() {
    return (
      <>
        <header
          className="masthead"
          style={{ backgroundImage: `url(${uow})`, height: "10vh" }}
        >
          <h1 className="masthead_text" style={{ height: "10vh" }}>
            Our Company
          </h1>
        </header>
        <section className="py-1">
          <div
            className="container"
            background-color="transparent"
            style={{ padding: "10px" }}
          ></div>
          <p style={{ padding: "0px 50px" }}>
            Our company connects local tourists with tour guides from around the
            world. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <h4 style={{ padding: "20px" }}>Mission Statement</h4>
          <p style={{ padding: "0px 50px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h4 style={{ padding: "20px" }}>Our Team</h4>
          <Container style={{ padding: "20px" }}>
            <Row>
              <Col xs={6} md={4}>
                <Figure>
                  <Figure.Image
                    roundedCircle
                    fluid
                    width={200}
                    height={200}
                    src={require("../images/andrea.jpg")}
                  />
                  <Figure.Caption>Andrea Burazor</Figure.Caption>
                </Figure>
              </Col>
              <Col xs={6} md={4}>
                <Figure>
                  <Figure.Image
                    roundedCircle
                    fluid
                    width={200}
                    height={200}
                    src={require("../images/brittney.jpg")}
                  />
                  <Figure.Caption>Brittney Chin</Figure.Caption>
                </Figure>
              </Col>
              <Col xs={6} md={4}>
                <Figure>
                  <Figure.Image
                    roundedCircle
                    fluid
                    width={200}
                    height={200}
                    src={require("../images/jackie.jpg")}
                  />
                  <Figure.Caption>Jaqueline Chamnankool</Figure.Caption>
                </Figure>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <Figure>
                  <Figure.Image
                    roundedCircle
                    fluid
                    width={200}
                    height={200}
                    src={require("../images/james.jpg")}
                  />
                  <Figure.Caption>James Dorevski</Figure.Caption>
                </Figure>
              </Col>
              <Col xs={6} md={4}>
                <Figure>
                  <Figure.Image
                    roundedCircle
                    fluid
                    width={200}
                    height={200}
                    src={require("../images/josh.jpg")}
                  />
                  <Figure.Caption>Josh Duncan</Figure.Caption>
                </Figure>
              </Col>
              <Col xs={6} md={4}>
                <Figure>
                  <Figure.Image
                    roundedCircle
                    fluid
                    width={200}
                    height={200}
                    src={require("../images/leanne.jpg")}
                  />
                  <Figure.Caption>Le Anne Ng</Figure.Caption>
                </Figure>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default AboutUsComponent;
