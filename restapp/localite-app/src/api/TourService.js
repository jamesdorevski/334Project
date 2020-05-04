import axios from "axios";

class TourService {
    getTours(country, city){
      return axios.get(`http://localhost:8080/tours/${country}/${city}`);
  }
}

export default new TourService()