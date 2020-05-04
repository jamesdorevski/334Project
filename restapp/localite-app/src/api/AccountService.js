import axios from "axios";

class AccountService {
  loginUser(email, password) {
    return axios.get("http://localhost:8080/login", {
      params: {
        email: email,
        password: password,
      },
    });
  }

  createUser(type, firstName, lastName, email, phoneNumber, languagesSpoken) {
    return axios.post("http://localhost:8080/account/create", {
      type: type,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      languagesSpoken: languagesSpoken,
    });
  }
}

export default new AccountService();
