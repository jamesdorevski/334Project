import axios from "axios";

const API_URL = "http://localhost:8080/";

class PublicService {

  getUserByID(id){
    return axios.get(API_URL + `/user/${id}`).then((response) => {
      // console.log(response)
      return response;
    })
}

  getFAQ() {
    return axios.get(API_URL + "faq");
  }

  getTourTags() {
    return axios.get(API_URL + "tour/tags")
  }

}

export default new PublicService();