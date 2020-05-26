package com.Localite.restapp.controller;

import java.lang.reflect.Array;
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

    @PostMapping(value = "/create/{guideID}")
    public String createTour(@PathVariable("guideID") ObjectId guideID,
                             @RequestBody Tour newTour)
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

    @PostMapping(value = "/search")
    public ArrayList<Tour> findTours(@RequestBody String str) throws Exception
    {
        JSONObject input = new JSONObject(str);
        JSONObject result = new JSONObject();
        ArrayList<Tour> tours = new ArrayList<>();

        //input object already contains:
        //String location, Date startDate, Date endDate, Number adults, Number children, Number infants
        try
        {
            tours = tourRepository.findTours(input.getString("city"), input.getString("country"));
            result.put("tours", tours);
            result.put("success", true);
        }
        catch (NullPointerException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to find any available tours");
            result.put("success", false);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "404 - Search error");
            result.put("success", false);
        }
        finally
        {
//            return result.toString();
            return tours;
        }
    }

    @PostMapping(value="/{userID}/addReview/{tourID}")
    public String addTourReview(@PathVariable ObjectId userID,
                                @PathVariable ObjectId tourID,
                                @RequestBody Review newReview) throws Exception
    {
        JSONObject result = new JSONObject();
        try
        {
            // obtaining reviewer details
            BasicDBObject reviewer = (accountRepository.findBy_id(userID).getBasicUser());
            newReview.setReviewer(reviewer);

            // adding review to tour
            Tour tour = tourRepository.findBy_id(tourID);
            tour.addReview(newReview);
            tourRepository.save(tour);
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
            result.put("message", "Review creation unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    // =================== BOOKING ===================
    @PostMapping(value="/{tourID}/booking/{userID}")
    public String makeBooking(@PathVariable("tourID") ObjectId tourID,
                              @PathVariable("userID") ObjectId userID,
                              @RequestBody Booking booking)
    {
        JSONObject result = new JSONObject();
        try
        {
            Tour tour = tourRepository.findBy_id(tourID);
            int numOfBookings = (tour.getLimit()-bookingRepository.countBookings(tourID));
            boolean bookingSpace = numOfBookings > 0; // minimum 1 booking to book
            boolean notBooked = bookingRepository.findByTourist(tourID, userID) == 0;

            if(bookingSpace && notBooked)
            {
                BasicDBObject tourist = (accountRepository.findBy_id(userID)).getBasicUser();
                booking.setTour(tour);
                booking.setTourist(tourist);
                booking.setDate(System.currentTimeMillis());
                bookingRepository.insert(booking);

                // if there was only 1 booking left before it was booked
                if (numOfBookings == 1)
                {
                    tour.setMaxLimit(true);
                    tourRepository.save(tour);
                }
                result.put("success", true);
            }
            else
            {
                result.put("success", false);
                if(!bookingSpace)
                    result.put("message", "No booking spots left");
                else
                {
                    result.put("message", "User has booked tour");
                    result.put("tour", tour); // returns tour as well to load tour page
                }
                if (debug) System.out.println(bookingSpace + " | " + notBooked);
            }
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
}
