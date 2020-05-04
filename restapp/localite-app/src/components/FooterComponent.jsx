import React, { Component } from "react";

class FooterComponent extends Component {
  render() {
    return (
      <>
        <span></span>
        <footer className="page-footer mt-6">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-2 mt-md-0 mt-3">
                <h6 className="text-uppercase">CONTACT US</h6>
                <ul className="list-unstyled">
                  <li>
                    <a style={{ fontSize: "16px" }}>Phone: XXXX XXX XXX</a>
                  </li>
                  <li>
                    <a style={{ fontSize: "16px" }}>Email: email@email.com</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 mb-md-0 mb-3">
                <h6 className="text-uppercase">SUPPORT</h6>
                <ul className="list-unstyled">
                  <li>
                    <a style={{ fontSize: "16px" }} href="#!">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a style={{ fontSize: "16px" }} href="#!">
                      Dispute Resolution
                    </a>
                  </li>
                  <li>
                    <a style={{ fontSize: "16px" }} href="#!">
                      Cancellation Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 mb-md-0 mb-3">
                <a style={{ fontSize: "16px" }} href="#!">
                  <h6 className="text-uppercase">ABOUT US</h6>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default FooterComponent;
