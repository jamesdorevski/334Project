import axios from "axios";
const API_URL = "http://localhost:8080/tour/";

class TourService {
  getTours(country, city) {
    return axios.get(API_URL + `${country}/${city}`);
  }

  convertTags(tagsArray) {
    var tags = [];

    for (var t in tagsArray) {
      tags.push(tagsArray[t].tag);
    }

    return tags;
  }

  getTour(id) {
    return axios.get(API_URL + `${id}`);
  }

  createTour(guideID, name, description, location, maxCapacity, tags) {
    return axios.post(API_URL + `create/${guideID}`, {
      name: name,
      description: description,
      location: location,
      capacity: maxCapacity,
      tags: this.convertTags(tags),
    });
  }

  checkReview(userID, tourID) {
    return axios.get(API_URL + `/reviewCheck/${userID}/${tourID}`);
  }

  addTourReview(tourID, userID, title, description, rating) {
    return axios.post(API_URL + `/${tourID}/addReview/${userID}`, {
      title: title,
      description: description,
      ratings: rating,
    });
  }

  filterTours(tags, minPrice, maxPrice, minRating) {
    return axios.post(API_URL + "filterSearch", {
      tags: tags,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minRating: minRating,
    });
  }

  makeBooking(
    tourID,
    userID,
    dateBooked,
    user,
    numOfParties,
    tour,
    dietaryRequirement,
    totalPrice
  ) {
    return axios.post(API_URL + `/${tourID}/makeBooking/${userID}`, {
      dateBooked: dateBooked,
      user: user,
      numOfParties: numOfParties,
      tour: tour,
      dietaryRequirement: dietaryRequirement,
      totalPrice: totalPrice,
    });
  }
}

export default new TourService();
