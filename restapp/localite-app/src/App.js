import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
import TourResultsComponent from "./components/TourResultsComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import SignUpComponent from "./components/SignUpComponent.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <HeaderComponent />
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/search" component={TourResultsComponent} />
            <Route path="/signup" component={SignUpComponent} />
          </Switch>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

export default App;
