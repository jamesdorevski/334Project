import axios from "axios";
const API_URL = "http://localhost:8080/tour/"

class TourService {
  getTours(country, city) {
    return axios.get(API_URL + `${country}/${city}`);
  }

  convertTags(tagsArray){
    var tags = []

    for (var t in tagsArray) {
      tags.push(tagsArray[t].tag)
    }

    return tags
  }

  getTour(id){
    return axios.get(API_URL + `${id}`);
  }

  createTour(guideID, name, description, location, maxCapacity, tags){
    console.log(name, description, location, maxCapacity, tags)

    // return axios.post(API_URL + `create/${guideID}`, {
    //   name: name,
    //   description: description,
    //   location: location,
    //   capacity: maxCapacity,
    //   tags: this.convertTags(tags)
    // });
  }
}

export default new TourService();
