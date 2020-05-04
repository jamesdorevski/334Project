import React, { Component } from "react"
import ExploreComponent from "./home/ExploreComponent.jsx"
import WorksComponent from "./home/WorksComponent.jsx"
import PopularComponent from "./home/PopularComponent.jsx"
import SearchComponent from "./home/SearchComponent.jsx"

class HomeComponent extends Component {
  render() {
    return (
      <>
        <header className="masthead"><SearchComponent/></header>
        <ExploreComponent />
        <WorksComponent />
        <PopularComponent />
      </>
    );
  }
}

export default HomeComponent;
