import axios from "axios";

class AuthenticationService {
  //will be replaced by AccountService.js
  
  registerSuccessfulLogin(username, password) {
    console.log("registerSuccessfulLogin");
    const response = axios.get('http://localhost:8080/login')
    console.log(response)
    sessionStorage.setItem("authenticatedUser", username);
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser");
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) {
      return false;
    }
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) {
      return "";
    }
    return user;
  }
}

export default new AuthenticationService(); //export instance
