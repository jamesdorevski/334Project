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
        // console.log(response.data)

        if (response.data.success) {
          // console.log(response.data.user)
          // console.log(JSON.parse(response.data.user))
          sessionStorage.setItem("user", (response.data.user));
          sessionStorage.setItem("currentView", "tourist")
        }

      return response;
      });
  }

  logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("currentView");
  }

  convertLangs(languagesSpokenArray){
    var languages = []

    for (var l in languagesSpokenArray) {
      languages.push(languagesSpokenArray[l].lang)
    }

    return languages
  }

  createUser(type, firstName, lastName, email, password, phoneNumber, languagesSpoken) {
    // console.log(gender)
    // console.log(license)
    console.log(type)

    return axios.post(API_URL + "create", {
      type: type,
      firstName: firstName,
      lastName: lastName,
      email: email,
      hashbrown: password,
      phoneNumber: phoneNumber,
      languagesSpoken: this.convertLangs(languagesSpoken),
    });
  }

  deleteUser(id) {
    // return {"success": false, "message": "Network Error"}
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
