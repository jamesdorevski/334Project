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
        if (response.data) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  createUser(type, firstName, lastName, email, phoneNumber, languagesSpoken) {
    return axios.post(API_URL + "create", {
      type: type,
      firstName: firstName,
      lastName: lastName,
      email: email,
      hashbrown: password,
      phoneNumber: phoneNumber,
      languagesSpoken: languagesSpoken,
    });
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
