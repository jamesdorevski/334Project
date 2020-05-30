import React, { Component } from "react";

class FooterComponent extends Component {
  render() {
    return (
      <>
        <span></span>
        <footer className="page-footer mt-6" style={{ paddingLeft: "30px" }}>
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-2 mt-md-0 mt-3">
                <h6 className="text-uppercase">CONTACT US</h6>
                <ul className="list-unstyled">
                  <li>
                    <p style={{ fontSize: "16px", paddingTop: "5px" }}>
                      Phone: XXXX XXX XXX
                    </p>
                  </li>
                  <li>
                    <p style={{ fontSize: "16px", marginTop: "-15px" }}>
                      Email: email@email.com
                    </p>
                  </li>
                </ul>
              </div>
              <div
                className="col-md-2 mb-md-0 mb-3"
                style={{ paddingLeft: "30px" }}
              >
                <h6 className="text-uppercase">SUPPORT</h6>
                <ul className="list-unstyled">
                  <li>
                    <a style={{ fontSize: "16px" }} href="/faq">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a style={{ fontSize: "16px" }} href="/disputes">
                      Dispute Resolution
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 mb-md-0 mb-3">
                <a style={{ fontSize: "16px" }} href="/about">
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
