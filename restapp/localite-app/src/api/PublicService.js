import axios from "axios";

const API_URL = "http://localhost:8080/";

class PublicService {

  getUserByID(id){
    return axios.get(API_URL + `/user/${id}`).then((response) => {
      // console.log(response)
      return response;
    })
}

getLanguages(){
  return axios.get(API_URL + "languages");
}

  getFAQ() {
    return axios.get(API_URL + "faq");
  }

  getTourTags() {
    return axios.get(API_URL + "tour/tags")
  }

  threeTours() {
    return axios.get(API_URL + "threeTours")
  }

}

export default new PublicService();