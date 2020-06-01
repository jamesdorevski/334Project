package com.Localite.restapp.model;

import com.mongodb.BasicDBObject;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.parameters.P;

import java.lang.reflect.Array;
import java.util.ArrayList;

@Getter @Setter
@Document(collection="Tours")
public class Tour 
{
     @Id private String _id;
     private BasicDBObject tourGuide; // owner of tour
     private String name;
     private BasicDBObject location;
     private Long startTour;
     private Long endTour;

     private String description;
     private BasicDBObject basePrices; // adult, child and infant
     private int capacity; // number of people
     private boolean maxLimit = false; // boolean for retrieval
     private ArrayList<String> tags;
     private ArrayList<String> img;

     // set only when retriving from db
     private ArrayList<Review> allReviews = new ArrayList<>();
     private double ratings = 5.0;

     public Tour(BasicDBObject tourGuide, String name, BasicDBObject location,
                 Long startTour, Long endTour,
                 String description, BasicDBObject basePrices, int capacity,
                 ArrayList<String> tags, ArrayList<String> img)
     {
          this.tourGuide = tourGuide;
          this.location = location;
          this.name = name;
          this.startTour = startTour;
          this.endTour = endTour;
          this.description = description;
          this.basePrices = basePrices;
          this.capacity = capacity;
          this.tags = tags;
          this.img = img;
     }

     public int getDurationInHours()
     {
          return (int) Math.ceil((endTour-startTour)/3600000);
     }

     public BasicDBObject getBasicTour()
     {
          BasicDBObject basic = new BasicDBObject();
          basic.put("_id", _id);
          basic.put("tourGuide", tourGuide);
          basic.put("location", location);
          basic.put("name", name);
          basic.put("duration", getDurationInHours());
          basic.put("description", description);
          basic.put("tags", tags);
          return basic;
     }

     public void setReviews(ArrayList<Review> allReviews)
     {
          // set new reviews and set rating
          this.allReviews = allReviews;
          this.ratings = calcRatings();
     }

     public double calcRatings()
     {
          double totalRatings = 5.0;
          for (int i=0; i<allReviews.size(); i++)
          {
               totalRatings += allReviews.get(i).getRatings();
          }
          return Math.round((totalRatings/(allReviews.size()+1)) * 10) / 10.0;
     }

     public int capacityCheck(ArrayList<Booking> allBookings, Booking booking)
     {
          int totalBookings = 0;

          // adding existing bookings
          for(int i=0; i<allBookings.size(); i++)
          {
               totalBookings += allBookings.get(i).getParties().getInt("adult");
               totalBookings += allBookings.get(i).getParties().getInt("child");
               totalBookings += allBookings.get(i).getParties().getInt("infant");
          }

          // adding current booking
          totalBookings += booking.getParties().getInt("adult");
          totalBookings += booking.getParties().getInt("child");
          totalBookings += booking.getParties().getInt("infant");

          // checking capacity
          return this.capacity - totalBookings;
     }

     public String getTotals(JSONObject numOfParties)
     {
          JSONObject totals = new JSONObject();

          // calculating adult
          double adultTotal = numOfParties.getDouble("adult")*basePrices.getDouble("adult");
          totals.put("adult", adultTotal);

          // calculating child
          double childTotal = numOfParties.getDouble("child")*basePrices.getDouble("child");
          totals.put("child", childTotal);

          // calculating infant
          double infantTotal = numOfParties.getDouble("infant")*basePrices.getDouble("infant");
          totals.put("infant", infantTotal);

          // total
          totals.put("total", adultTotal+childTotal+infantTotal);
          return totals.toString();
     }

     public double calcTotalCost(BasicDBObject booking)
     {
          // calculating adult
          double adultTotal = booking.getDouble("adult")*basePrices.getDouble("adult");

          // calculating child
          double childTotal = booking.getDouble("child")*basePrices.getDouble("child");

          // calculating infant
          double infantTotal = booking.getDouble("infant")*basePrices.getDouble("infant");

          return adultTotal+childTotal+infantTotal;
     }

     public void update(Tour newInfo)
     {
          if(newInfo.name != null)
               this.name = newInfo.name;

          if(newInfo.location != null)
               this.location = newInfo.location;

          if(newInfo.startTour != null)
               this.startTour = newInfo.startTour;

          if(newInfo.endTour != null)
               this.endTour = newInfo.endTour;

          if(newInfo.description != null)
               this.description = newInfo.description;

          if(newInfo.basePrices != null)
               this.basePrices = newInfo.basePrices;

          if(newInfo.capacity != 0)
               this.capacity = newInfo.capacity;

          if(newInfo.tags != null)
          {
               this.tags.clear();
               this.tags.addAll(newInfo.tags);
          }
     }

     public JSONObject getTour()
     {
          JSONObject tour = new JSONObject();
          tour.put("_id", _id);
          tour.put("tourGuide", tourGuide);
          tour.put("location", location);
          tour.put("name", name);
          tour.put("duration", getDurationInHours());
          tour.put("description", description);
          tour.put("tags", tags);
          tour.put("img", img);
          tour.put("basePrices", basePrices);
          tour.put("capacity", capacity);
          tour.put("ratings", ratings);
          tour.put("allReviews", allReviews);
          return tour;
     }

     @Override
     public String toString()
     {
          JSONObject tour = new JSONObject();
          tour.put("_id", _id);
          tour.put("tourGuide", tourGuide);
          tour.put("location", location);
          tour.put("name", name);
          tour.put("duration", getDurationInHours());
          tour.put("description", description);
          tour.put("tags", tags);
          tour.put("img", img);
          tour.put("basePrices", basePrices);
          tour.put("capacity", capacity);
          return tour.toString();
     }
}
