import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { withRouter } from "react-router";
import DatePicker from "../../Utilities/DatePicker";

export const SearchComponent = ({ ...props }) => {
  const [ state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      ranges: null,
    },
  ]);

  const searchClicked = () => {
    //these are printing undefined right now -- how are these being updated?
    console.log(state.startDate)
    console.log(state.endDate)
    props.history.push("/search");
  };

  return (
    <div className="container h-100" style={{ paddingTop: "200px" }}>
      <div className="row h-100 align-items-center">
        <div className="col-12 text-center">
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="location">
                  <Form.Control placeholder="Where are you traveling?" />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="date">
                  <DatePicker />
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="people">
                  <Form.Control placeholder="2 Adults" />
                </Form.Group>
              </Form.Row>
              <Form.Row className="justify-content-end">
                <Button size="md" onClick={searchClicked}>
                  Find a tour
                </Button>
              </Form.Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SearchComponent);
