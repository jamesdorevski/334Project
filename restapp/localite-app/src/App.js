import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import HeaderComponent from "./components/HeaderComponent.jsx"
import HomeComponent from "./components/HomeComponent.jsx"
import TourResultsComponent from "./components/TourResultsComponent.jsx"
import FooterComponent from "./components/FooterComponent.jsx"
import SignUpComponent from "./components/SignUpComponent.jsx"
import AboutUsComponent from "./components/AboutUsComponent.jsx"
import FAQComponent from "./components/FAQComponent.jsx"
import DisputeResolutionComponent from "./components/DisputeResolutionComponent.jsx"
import TourComponent from "./components/TourComponent.jsx"
import BecomeAGuideComponent from "./components/BecomeAGuideComponent.jsx"
import AccountComponent from "./components/AccountComponent"
import UpcomingToursComponent from "./components/UpcomingToursComponent"
import PastToursComponent from "./components/PastToursComponent"
import ProfileComponent from "./components/ProfileComponent"

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
            <Route path="/signup/guide" component={BecomeAGuideComponent} />
            <Route path="/signup" component={SignUpComponent} />
            <Route path="/about" component={AboutUsComponent} />
            <Route path="/faq" component={FAQComponent} />
            <Route path="/disputes" component={DisputeResolutionComponent} />
            <Route path="/tours/:id" component={TourComponent} />
            <Route path="/account/show/:id" component={ProfileComponent} />
            <Route path="/account/:id/upcoming" component={UpcomingToursComponent} />
            <Route path="/account/:id/past" component={PastToursComponent} />
            <Route path="/account/:id" component={AccountComponent} />
          </Switch>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

export default App;
