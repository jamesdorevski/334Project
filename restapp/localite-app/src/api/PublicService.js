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

}

export default new PublicService();