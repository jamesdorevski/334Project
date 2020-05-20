package com.Localite.restapp.controller;

import com.Localite.restapp.model.Account;
import com.Localite.restapp.model.Location;
import com.Localite.restapp.model.Tour;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class TourController {
    @Autowired private Account sessionUser;

    @GetMapping(path="/tours/{country}/{city}")
    public ArrayList<Tour> getTours(@PathVariable String country, @PathVariable String city){
        Location location = Location.builder()
                .country(country)
                .city(city)
                .build();

        //query tours in database using given country and city

        //hardcoded tour list
        ArrayList<Tour> tours = new ArrayList<>();

        ArrayList<String> langs = new ArrayList<String>();
        langs.add("English");

//        TourGuide guide1 = TourGuide.builder()
//                .firstName("James")
//                .lastName("Dorevski")
//                .email("jdorevski@gmail.com")
//                .phoneNumber("5555555555")
//                .languages(langs)
//                .build();
//
//        //use database to query tours for given location
//        Tour tour1 = Tour.builder()
//                .tourName("Backpacking in the Blue Mountains")
//                .tourGuide(guide1)
//                .description("Description for Backpacking in the Blue Mountains")
//                .autoApprove(true)
//                .basePrice(150.00)
//                .duration(6.00)
//                .location(location)
//                .maxSize(10)
//                .reviews(new ArrayList<>())
//                .tags(new ArrayList<>())
//                .build();
//
//        tours.add(tour1);

        //return list of tours to display on frontend
        return tours;

    }
}
