import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Routes } from "./navigation/routes";
import AuthenticatedRoute from "./components/AuthenticatedRoute"
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
import BecomeAGuideComponent from "./components/BecomeAGuideComponent.jsx"
import AccountComponent from "./components/AccountComponent"
import UpcomingToursComponent from "./components/UpcomingToursComponent"
import PastToursComponent from "./components/PastToursComponent"
import ProfileComponent from "./components/ProfileComponent"
import LoginComponent from "./components/LoginComponent"

export const App = () => {
    return (
      <div className="App">
        <Router>
          <HeaderComponent />
          <Switch>

            {/*<Route render={() => <Redirect to={{pathname: "/"}} />} />*/}
            <Route path={Routes.HOME} component={HomeComponent} />
            <Route path={Routes.LOGIN} component={LoginComponent} />
            <Route path={Routes.SEARCH} component={TourResultsComponent} />
            <Route path={Routes.SIGN_UP_GUIDE} component={BecomeAGuideComponent} />
            <Route path={Routes.SIGN_UP} component={SignUpComponent} />
            <Route path={Routes.ABOUT} component={AboutUsComponent} />
            <Route path={Routes.FAQ} component={FAQComponent} />
            <Route path={Routes.DISPUTES} component={DisputeResolutionComponent} />
            {/*<Route path={Routes.TOURS} component={TourComponent} />*/}
            <Route path={Routes.PROFILE} component={ProfileComponent} />
            <AuthenticatedRoute path={Routes.UPCOMING_TOURS} component={UpcomingToursComponent} />
            <AuthenticatedRoute path={Routes.PAST_TOURS} component={PastToursComponent} />
            <AuthenticatedRoute path={Routes.ACCOUNT} component={AccountComponent} />
            <Route path="*">
                <Redirect to={Routes.HOME} />
            </Route>
          </Switch>
          <FooterComponent />
        </Router>
      </div>
    );
}

export default App;
