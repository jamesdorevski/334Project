import React, { Component } from "react";
import ExploreComponent from "./home/ExploreComponent.jsx";
import WorksComponent from "./home/WorksComponent.jsx";
import PopularComponent from "./home/PopularComponent.jsx";
import SearchComponent from "./home/SearchComponent.jsx";
import plane from "../images/plane.jpg";

class HomeComponent extends Component {
  render() {
    return (
      <>
        <header
          className="masthead"
          style={{ backgroundImage: `url(${plane})`, height: "80vh"}}
        >
          <SearchComponent />
        </header>
        <ExploreComponent />
        <WorksComponent />
        <PopularComponent />
      </>
    );
  }
}

export default HomeComponent;
