package com.Localite.restapp.controller;

import java.util.ArrayList;
import java.util.Date;
import com.Localite.restapp.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import net.minidev.json.JSONObject;
import com.Localite.restapp.repository.TourRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value = "/tour")
public class TourController 
{    
    @Autowired private Account sessionUser;
    @Autowired private TourRepository tourRepository;

    /*
     * Allows tour guide Account type to create a new Tour object
     * 
     * @author James Dorevski 
     * @param Tour object 
     * @return String outlining the new tour's status
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String createTour(@RequestBody Tour newTour) 
    {
        JSONObject newTourStatus = new JSONObject();

        try 
        {
            // attempt to add the Tour argument into the Tours collection
            tourRepository.insert(newTour); 

            newTourStatus.put("message", "Tour created");
            newTourStatus.put("success", true);
        } catch (Exception e) 
        {
            System.out.println(e);

            newTourStatus.put("message", "An unknown error has occured");
            newTourStatus.put("success", false);
        } 

        return newTourStatus.toString();
    }

    /*
     * Queries tours with the given city & country, as well as avaliablity for the given 
     * dates.
     * 
     * @author James Dorevski
     * @param city, country, startDate & endDate
     * @return ArrayList of Tours matching the query criteria
     * 
     */
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public ArrayList<Tour> queryTours(String city, String country, Date startDate, Date endDate) 
    {
        // TODO: create search query class 
    }

}
