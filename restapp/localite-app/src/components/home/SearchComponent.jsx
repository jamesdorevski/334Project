import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import { withRouter } from "react-router"

class SearchComponent extends Component {

    searchClicked = () => {
        this.props.history.push("/search");
    }
    
  render() {
    return (
      <div className="container h-100" style={{paddingTop: "200px"}}>
        <div className="row h-100 align-items-center">
          <div className="col-12 text-center">
            <div>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="location">
                    <Form.Control placeholder="Where are you traveling?" />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="date">
                    <Form.Control placeholder="Select your dates" />
                  </Form.Group>

                  <Form.Group as={Col} md="2" controlId="people">
                    <Form.Control placeholder="2 Adults" />
                  </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-end">
                <Button size="md" onClick={this.searchClicked}>
                  Find a tour
                </Button>
                </Form.Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchComponent);
