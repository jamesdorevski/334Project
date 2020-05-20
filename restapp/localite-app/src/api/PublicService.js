import axios from "axios";

const API_URL = "http://localhost:8080/";

class PublicService {
  getUserByID(id) {
    return axios
      .post(API_URL + "getUser", {
        id
      })
      .then((response) => {
        // console.log(response.data)

        if (response.data.success) {
        }

      return response;
      });
  }

  getFAQ() {
      return axios.get(API_URL + "getFAQ");
  }

}

export default new PublicService();