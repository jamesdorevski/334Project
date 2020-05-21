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
import com.Localite.restapp.repository.BookingRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value = "/tour")
public class TourController 
{
    private boolean debug = true;
    @Autowired private Account sessionUser;
    @Autowired private TourRepository tourRepository;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private AccountRepository accountRepository;

    // =================== TOUR ===================
    @GetMapping(value="/{tourID}")
    public String getTour(@PathVariable("tourID") ObjectId tourID)
    {
        JSONObject result = new JSONObject();
        try
        {
            Tour tour = tourRepository.findBy_id(tourID);
            result.put("tour", tour);
            result.put("success", true);
        }
        catch (NullPointerException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to find tour");
            result.put("success", false);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Tour does not exist");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
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
        JSONObject result = new JSONObject();
        try 
        {
            BasicDBObject tourguide = (accountRepository.findBy_id(guideID)).getBasicUser();
            newTour.setTourGuide(tourguide);
            tourRepository.insert(newTour);

            result.put("message", "Tour created");
            result.put("success", true);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Tour creation unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @DeleteMapping(value = "/delete/{tourID}")
    public String deleteTour(@PathVariable("tourID") ObjectId tourID)
    {
        JSONObject result = new JSONObject();
        try
        {
            tourRepository.deleteBy_id(tourID);
            result.put("message", "Tour deleted");
            result.put("success", true);
        }
        catch(Exception e)
        {
            result.put("message", "Tour deletion unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
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

    // =================== BOOKING ===================
    @PostMapping(value="/booking/{tourID}/{userID}")
    public String makeBooking(@PathVariable("tourID") ObjectId tourID, @PathVariable("userID") ObjectId userID,
                              @RequestBody Booking booking)
    {
        JSONObject result = new JSONObject();
        try
        {
            BasicDBObject tourist = (accountRepository.findBy_id(userID)).getBasicUser();
            Tour tour = tourRepository.findBy_id(tourID);
            booking.setTour(tour);
            booking.setTourist(tourist);
            bookingRepository.insert(booking);
            result.put("success", true);
        }
        catch (NullPointerException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to find tour");
            result.put("success", false);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Booking unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @GetMapping(value="/bookingList")
    public String getBookings()
    {
        JSONObject result = new JSONObject();
        try
        {
            // find bookings
            // check if bookings exist. return no bookings else ....
            // sort them by past and current bookings
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to load bookings");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }
}
