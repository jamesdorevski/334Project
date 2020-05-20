package com.Localite.restapp.controller;

import java.util.ArrayList;
import com.Localite.restapp.model.*;
import com.mongodb.BasicDBObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

import com.Localite.restapp.repository.AccountRepository;
import com.Localite.restapp.repository.TourRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value = "/tour")
public class TourController 
{
    private boolean debug = true;
    @Autowired private Account sessionUser;
    @Autowired private TourRepository tourRepository;
    @Autowired private AccountRepository accountRepository;

    @GetMapping(value="/{tourID}")
    public String getTour(@PathVariable("tourID") ObjectId tourID)
    {
        JSONObject results = new JSONObject();
        try
        {
            Tour tour = tourRepository.findBy_id(tourID);
            results.put("tour", tour);
            results.put("success", true);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            results.put("message", "Tour does not exist");
            results.put("success", false);
        }
        finally
        {
            return results.toString();
        }
    }

    /*
     * Allows tour guide Account type to create a new Tour object
     * 
     * @author James Dorevski 
     * @param Tour object 
     * @return String outlining the new tour's status
     */
    @PostMapping(value = "/create/{guideID}")
    public String createTour(@PathVariable("guideID") ObjectId guideID, @RequestBody Tour newTour)
    {
        JSONObject results = new JSONObject();
        try 
        {
            BasicDBObject tourguide = (accountRepository.findBy_id(guideID)).getSimpleUser();
            newTour.setTourGuide(tourguide);
            tourRepository.insert(newTour);

            results.put("message", "Tour created");
            results.put("success", true);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            results.put("message", "Tour creation unsuccessful");
            results.put("success", false);
        }
        finally
        {
            return results.toString();
        }
    }

    @DeleteMapping(value = "/delete/{tourID}")
    public String deleteTour(@PathVariable("tourID") ObjectId tourID)
    {
        JSONObject results = new JSONObject();
        try
        {
            tourRepository.deleteBy_id(tourID);
            results.put("message", "Tour deleted");
            results.put("success", true);
        }
        catch(Exception e)
        {
            results.put("message", "Tour deletion unsuccessful");
            results.put("success", false);
        }
        finally
        {
            return results.toString();
        }
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
    @PostMapping(value = "/search")
    public ArrayList<Tour> findTours(@RequestBody String str) throws Exception
    {
        JSONObject input = new JSONObject(str);
        //String city, String country, Date startDate, Date endDate

        // TODO: create search query class
        return new ArrayList<Tour>();
    }

}
