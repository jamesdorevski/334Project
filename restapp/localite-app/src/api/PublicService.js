import axios from "axios";

const API_URL = "http://localhost:8080/";

class PublicService {
  getUserByID(id) {
    return axios.get(API_URL + `user/${id}`)
  }

  getLanguages() {
    return axios.get(API_URL + "languages");
  }

  getFAQ() {
    return axios.get(API_URL + "faq");
  }

  getTourTags() {
    return axios.get(API_URL + "tour/tags");
  }

  threeTours() {
    return axios.get(API_URL + "threeTours");
  }

  fileDispute(userID, guideID, description) {
    return axios.post(API_URL + `/dispute/${userID}/${guideID}`, {
      description: description,
    });
  }
}

export default new PublicService();
