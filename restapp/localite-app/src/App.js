import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Routes } from "./navigation/routes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
import TourResultsComponent from "./components/TourResultsComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import SignUpComponent from "./components/SignUpComponent.jsx";
import AboutUsComponent from "./components/AboutUsComponent.jsx";
import FAQComponent from "./components/FAQComponent.jsx";
import DisputeResolutionComponent from "./components/DisputeResolutionComponent.jsx";
import BecomeAGuideComponent from "./components/BecomeAGuideComponent.jsx";
import AccountComponent from "./components/AccountComponent";
import MyBookingsComponent from "./components/MyBookingsComponent";
import MyToursComponent from "./components/MyToursComponent";
import ProfileComponent from "./components/ProfileComponent";
import LoginComponent from "./components/LoginComponent";
import UpdateAccountComponent from "./components/UpdateAccountComponent";
import CreateTourComponent from "./components/CreateTourComponent";
import MessagesComponent from "./components/MessagesComponent";
import ViewTourComponent from "./components/ViewTourComponent";
import ViewBookingsAsGuideComponent from "./components/ViewBookingsAsGuideComponent";
import ViewBookingsAsTouristComponent from "./components/ViewBookingsAsTouristComponent";

export const App = () => {
  return (
    <div className="App">
      
        <Router>
          <div id="page-container">
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
              <Route path={Routes.TOURS} component={ViewTourComponent} />
              <Route path={Routes.TOURIST_BOOKINGS} component={ViewBookingsAsTouristComponent}/>
              <Route path={Routes.GUIDE_BOOKINGS} component={ViewBookingsAsGuideComponent}/>
              <AuthenticatedRoute path={Routes.CREATE_TOUR} component={CreateTourComponent} />
              <Route path={Routes.PROFILE} component={ProfileComponent} />
              <AuthenticatedRoute path={Routes.MY_BOOKINGS} component={MyBookingsComponent} />
              <AuthenticatedRoute path={Routes.MY_TOURS} component={MyToursComponent} />
              <AuthenticatedRoute exact path={Routes.ACCOUNT} component={AccountComponent} />
              <AuthenticatedRoute path={Routes.UPDATE_ACCOUNT} component={UpdateAccountComponent} />
              <AuthenticatedRoute path={Routes.MESSAGES} component={MessagesComponent} />
              <Route path="*">
                <Redirect to={Routes.HOME} />
              </Route>
            </Switch>
          </div>
          <FooterComponent id="footer" />
          
        </Router>
      
    </div>
  );
};

export default App;
