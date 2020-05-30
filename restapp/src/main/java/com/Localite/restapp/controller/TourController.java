package com.Localite.restapp.controller;

import java.lang.reflect.Array;
import java.util.ArrayList;
import com.Localite.restapp.model.*;
import com.Localite.restapp.repository.ReviewRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.internal.client.model.AggregationLevel;
import com.mongodb.util.JSON;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
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
    @Autowired private ReviewRepository reviewRepository;

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

    @PostMapping(value="/update/{tourID}")
    public String updateTour(@PathVariable("tourID") ObjectId tourID,
                             @RequestBody Tour newInfo) throws Exception
    {
        JSONObject result = new JSONObject();

        try
        {
            Tour thisTour = tourRepository.findBy_id(tourID);
            thisTour.update(newInfo);
            tourRepository.save(thisTour);
            result.put("success", true);
        }
        catch (DataIntegrityViolationException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Tour update unsuccessful");
            result.put("success", false);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Network Error");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping(value = "/search")
    public String findTours(@RequestBody String str) throws Exception
    {
        JSONObject input = new JSONObject(str);
        JSONObject result = new JSONObject();
        try
        {
            ArrayList<Tour>tours = tourRepository.findTours(input.getString("city"), input.getString("country"),
                                   input.getLong("startDate"), input.getLong("endDate"),
                                    input.getInt("numOfParties"));
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
            return result.toString();
        }
    }

    @PostMapping(value="/{tourID}/addReview/{userID}")
    public String addTourReview(@PathVariable ObjectId userID,
                                @PathVariable ObjectId tourID,
                                @RequestBody Review newReview) throws Exception
    {
        JSONObject result = new JSONObject();
        try
        {
            // setting dateCreated
            newReview.setDateCreated(System.currentTimeMillis());

            // setting reviewer
            Account reviewer = accountRepository.findBy_id(userID);
            newReview.setReviewer(reviewer.getBasicUser());

            // setting tour reviewed
            Tour tour = tourRepository.findBy_id(tourID);
            newReview.setTour(tour);

            // adding review to repo
            reviewRepository.insert(newReview);
            result.put("success", true);
        }
        catch (NullPointerException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to find tour/basic reviewer");
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
    @PostMapping(value="/{tourID}/makeBooking/{userID}")
    public String makeBooking(@PathVariable("tourID") ObjectId tourID,
                              @PathVariable("userID") ObjectId userID,
                              @RequestBody String str)
    {
        JSONObject input = new JSONObject(str);
        JSONObject result = new JSONObject();
        try
        {
            Tour tour = tourRepository.findBy_id(tourID);
            int numOfBookings = (tour.getCapacity()-bookingRepository.countBookings(tourID));
            boolean bookingSpace = numOfBookings > 0; // minimum 1 booking to book
            boolean notBooked = bookingRepository.findByTourist(tourID, userID) == 0;

            if(bookingSpace && notBooked)
            {
                Account tourist = accountRepository.findBy_id(userID);
                int totalParties = input.getInt("adult")+input.getInt("child")+input.getInt("infant");
                for(int i=0; i<totalParties; i++)
                {
                    Booking booking = new Booking();
                    booking.setTour(tour);
                    booking.setTourist(tourist.getBasicUser());
                    booking.setDate(System.currentTimeMillis());
                    booking.setDietaryRequirement(input.getString("dietaryRequirement"));
                    booking = bookingRepository.insert(booking);

//                    if (i == 0)
//                        tourist.addBooking(booking);
                }

                int bookingsLeft = numOfBookings-totalParties;
                if (bookingsLeft == 0)
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

    @DeleteMapping("/{tourID}/removeBooking/{userID}")
    public String removeBooking(@PathVariable("tourID") ObjectId tourID,
                                @PathVariable("userID") String userID) throws Exception
    {
        JSONObject result = new JSONObject();
        try
        {
            bookingRepository.deleteBookings(userID, tourID);
            result.put("message", "Booking removed");
            result.put("success", true);
        }
        catch(Exception e)
        {
            result.put("message", "Booking removal unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    // =================== PAYMENT ===================
    @PostMapping("/{tourID}/makePayment")
    public String makePayment(@PathVariable("tourID") ObjectId tourID,
                              @RequestBody String str) throws Exception
    {
        JSONObject input = new JSONObject(str);
        JSONObject result = new JSONObject();

        try
        {
            Tour tour = tourRepository.findBy_id(tourID);
            result.put("allTotals", tour.getTotals(input));
            result.put("success", true);
        }
        catch (Exception e)
        {
            result.put("success", false);
            result.put("message", "Unable to calculate totals");
        }
        finally
        {
            return result.toString();
        }
    }

    @GetMapping("/{tourID}/preRefund/{userID}")
    public String preRefund(@PathVariable("tourID") ObjectId tourID,
                             @PathVariable("userID") ObjectId userID)
    {
        JSONObject result = new JSONObject();

        try
        {

        }
        catch(Exception e)
        {

        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping("/{tourID}/makeRefund/{userID}")
    public String makeRefund(@PathVariable("tourID") ObjectId tourID,
                            @PathVariable("userID") ObjectId userID)
    {
        JSONObject result = new JSONObject();

        try
        {

        }
        catch(Exception e)
        {

        }
        finally
        {
            return result.toString();
        }
    }
}
