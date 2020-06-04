import axios from "axios";

const API_URL = "http://localhost:8080/account/";

class AccountService {
  loginUser(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {

        if (response.data.success) {
          sessionStorage.setItem("user", response.data.user);
          sessionStorage.setItem("currentView", "tourist");
        }

        return response;
      });
  }

  logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("currentView");
  }

  convertLangs(languagesSpokenArray) {
    var languages = [];

    for (var l in languagesSpokenArray) {
      languages.push(languagesSpokenArray[l].lang);
    }

    return languages;
  }

  createUser(
    type,
    firstName,
    lastName,
    email,
    password,
    gender,
    phoneNumber,
    languagesSpoken
  ) {
  
    return axios.post(API_URL + "create", {
      type: type,
      firstName: firstName,
      lastName: lastName,
      email: email,
      hashbrown: password,
      gender: gender,
      phoneNumber: phoneNumber,
      languagesSpoken: this.convertLangs(languagesSpoken),
    });
  }

  updateUser(
    id,
    firstName,
    lastName,
    email,
    password,
    gender,
    phoneNumber,
    languagesSpoken
  ) {

    return axios.post(API_URL + `update/${id}`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      hashbrown: password,
      gender: gender,
      phoneNumber: phoneNumber,
      languagesSpoken: this.convertLangs(languagesSpoken),
    });
  }

  getUserProfile(id) {
    return axios.get(API_URL + `profile/${id}`);
  }

  deleteUser(id) {
    return axios.delete(API_URL + `delete/${id}`);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("user");
    if (user === null) {
      return false;
    }
    return true;
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }
}

export default new AccountService();
