package com.Localite.restapp.controller;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import com.Localite.restapp.model.*;
import com.Localite.restapp.repository.ReviewRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.internal.client.model.AggregationLevel;
import com.mongodb.util.JSON;
import org.bson.types.ObjectId;

import java.util.Optional;
import java.util.Random;
import org.json.JSONArray;
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
            result.put("tour", tour.getTour());
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

    @PostMapping(value = "/filterSearch")
    public String filterTours(@RequestBody String str) throws Exception
    {
        JSONObject input = new JSONObject(str);
        JSONObject result = new JSONObject();
        try
        {
            // converting tags into array for db search
            JSONArray rawTags = input.getJSONArray("tags");
            ArrayList<String> tags = new ArrayList<>();

            for(int i=0; i<rawTags.length(); i++)
            {
                tags.add(rawTags.getString(i));
            }

            ArrayList<Tour> tours = tourRepository.filterTours(tags,
                                input.getInt("minPrice"), input.getInt("maxPrice"),
                                input.getInt("ratings"));
            result.put("tours", tours);
            result.put("success", true);
        }
        catch (NullPointerException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to find any available tours");
            result.put("success", false);
        }
        catch (Exception e)
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
            newReview.setTour(tour.getBasicTour());

            // updating tour reviews
            ArrayList<Review> oldReview = tour.getAllReviews();
            oldReview.add(0, newReview);
            tour.setReviews(oldReview);
            tourRepository.save(tour);

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
                              @RequestBody Booking booking)
    {
        JSONObject result = new JSONObject();
        try
        {
            Tour tour = tourRepository.findBy_id(tourID);

            // check if user has booked this before
            boolean notBooked = bookingRepository.findByTourist(tourID, userID) == 0;

            if(notBooked)
            {
                // check capacity of tour
                ArrayList<Booking> bookingList = bookingRepository.getTourBookings(tourID);
                int spaceLeft = tour.capacityCheck(bookingList, booking);

                if(spaceLeft >= 0)
                {
                    Account tourist = accountRepository.findBy_id(userID);

                    // setting booking values
                    booking.setDateBooked(System.currentTimeMillis());
                    booking.setUser(tourist.getBasicUser());
                    booking.setTour(tour);
                    booking.setTotalPrice(tour.calcTotalCost(booking.getParties()));
                    booking = bookingRepository.insert(booking);

                    if (spaceLeft == 0)
                    {
                        tour.setMaxLimit(true);
                        tourRepository.save(tour);
                    }

                    result.put("confirmationNum", booking.get_id().toString());
                }
                else
                {
                    result.put("success", false);
                    result.put("message", "Not enough space for all parties");
                }
            }
            else
            {
                result.put("success", false);
                result.put("message", "User has booked tour");
                result.put("tour", tour); // returns tour as well to load tour page
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
            // setting maxLimit to false
            Tour tour = tourRepository.findBy_id(tourID);
            tour.setMaxLimit(false);
            tourRepository.save(tour);

            // delete booking
            bookingRepository.deleteBooking(userID, tourID);

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
    @PostMapping("/{tourID}/getTotalCost")
    public String getTotalCost(@PathVariable("tourID") ObjectId tourID,
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

    @PostMapping(value = "/generateTour")
    public String generateTour()
    {
        int amountToGenerate = 1000;
        Random random = new Random();
        JSONObject result = new JSONObject();
        try
        {
            for(int i = 0; i<amountToGenerate; i++)
            {
              ArrayList <Account> allTourGuides = accountRepository.findByType("tourguide");
              ObjectId guideID = allTourGuides.get(i).get_id();
              System.out.println("hi1");

              //create the random variables from lists
              ArrayList<String> nameP1Options = new ArrayList<>(
              Arrays.asList("Ride", "Eat", "See", "Pet", "Snuggle", "Photograph"));
              String nameP1 = nameP1Options.get( random.nextInt(nameP1Options.size()));
                System.out.println("hi2");

              ArrayList<String> nameP2Options = new ArrayList<>(
              Arrays.asList("Elephant", "City", "Sights", "Culture", "Cuisine"));
              String nameP2 = nameP2Options.get( random.nextInt(nameP2Options.size()));
                System.out.println("hi3");

              //fake cities to match any country
              ArrayList<String> cityOptions = new ArrayList<>(
              Arrays.asList("LittleShire", "Bordeauxsville", "Mapleton"));
              String city = cityOptions.get( random.nextInt(cityOptions.size()));
                System.out.println("hi4");

              ArrayList<String> countryOptions = new ArrayList<>(
              Arrays.asList("Australia", "France", "Canada"));
              String country = countryOptions.get( random.nextInt(countryOptions.size()));

              ArrayList<String> descriptionP1Options = new ArrayList<>(
              Arrays.asList("Try", "Experience", "Get", "Meet"));
              String descP1 = descriptionP1Options.get( random.nextInt(descriptionP1Options.size()));

              ArrayList<String> descriptionP2Options = new ArrayList<>(
              Arrays.asList("Flip", "Memory", "Tan", "Local", "Brew"));
              String descP2 = descriptionP2Options.get( random.nextInt(descriptionP2Options.size()));

              //start generating a tour using generated variables
              ObjectId _id = new ObjectId();
              BasicDBObject tourGuide = (accountRepository.findBy_id(guideID).getBasicUser());
              String name = (nameP1 + " the " + nameP2);
              BasicDBObject location = new BasicDBObject();
                location.append("city", city);
                location.append("country", country);
              Long startTour = new Long("1597193100000");
              Long endTour =  new Long("1597218300000");
              String description = (descP1 + " a " + descP2);
              BasicDBObject basePrices = new BasicDBObject(); // adult, child and infant
              basePrices.append("adult", random.nextInt(30)) ;
              basePrices.append("child", random.nextInt(20)) ;
              basePrices.append("infant",random.nextInt(10)) ;
              int capacity = random.nextInt(100); // number of people
              boolean maxLimit = (random.nextInt(30) % 2) == 0 ? true : false; // boolean for retrieval
              ArrayList<String> tags = new ArrayList<>();
              ArrayList<Review> allReviews = new ArrayList<>();

              //create a tour
                ArrayList<String> img = new ArrayList<>();
              Tour generatedTour = new Tour(tourGuide, name, location, startTour, endTour, description, basePrices, capacity, tags, img);
              createTour(guideID, generatedTour);

              result.put("message", "Tour generated");
              result.put("success", true);
            }
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Tour generation unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }


@PostMapping(value="/generateBooking")
    public String generateBooking(@RequestBody int amountToGenerate)
    {
        Random random = new Random();
        JSONObject result = new JSONObject();
        try
        {
            for(int i = 0; i<amountToGenerate*100; i++)
            {
              ArrayList <Account> allTourists = accountRepository.findByType("tourist");
              Account tourist = allTourists.get(random.nextInt(allTourists.size()));
              ObjectId userId = tourist.get_id();
              BasicDBObject user = tourist.getBasicUser();

              ObjectId _id = new ObjectId();
              Long dateBooked = new Long("1590850400000");
              BasicDBObject parties = new BasicDBObject();

                int partycount = random.nextInt(5);
              parties.append("adult", partycount);
                partycount = random.nextInt(5);
              parties.append("child", partycount);
                partycount = random.nextInt(5);
              parties.append("infant", partycount);

              ArrayList <Tour> allTours = tourRepository.findAll();
              Tour tour = allTours.get(random.nextInt(allTours.size()));

              String tourId = tour.get_id();

              ArrayList<String> dietaryRequirementList = new ArrayList<>(
              Arrays.asList("Vegan", "Vegetarian", "Gluten-Free", "Low-Fodmap",
                            "Dairy-Free", "Allergy: Nut", "Allergy: Kiwi", "Allergy: Berry",
                            "Halal", "Kosher", "Pescatarian", "Low-Salt", "Allergy: Egg",
                            "No-Alcohol", "Wheat-Free", "Allergy: Onion", "No-Soy", "No-Fish",
                            "Allergy: Shellfish", "No-Corn", "Low-Sugar"));

              String dietaryRequirement = "";
              dietaryRequirement += dietaryRequirementList.get(random.nextInt(dietaryRequirementList.size()));
              int requirements = random.nextInt(3);
              for(int j = 0; j < requirements; j++)
              {
                dietaryRequirement += ", ";
                dietaryRequirement += dietaryRequirementList.get(random.nextInt(dietaryRequirementList.size()));
              }
              double totalPrice = random.nextInt(300);

              //make a booking
              Booking generatedBooking = new Booking(_id, dateBooked, user, parties, tour, dietaryRequirement, totalPrice);

              System.out.println(makeBooking(new ObjectId(tourId), userId, generatedBooking));
            }

              result.put("message", "Booking generated");
              result.put("success", true);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Booking generation unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
      }
}
