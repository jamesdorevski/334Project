package com.Localite.restapp.model;

import com.mongodb.BasicDBObject;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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

     private ArrayList<Review> allReviews = new ArrayList<>();

     public Tour(BasicDBObject tourGuide, String name, BasicDBObject location,
                 Long startTour, Long endTour,
                 String description, BasicDBObject basePrices, int capacity,
                 ArrayList<String> tags)
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
     }

     public int getDurationInHours()
     {
          return (int) Math.ceil((startTour-endTour)/3600000);
     }

     public double getRating()
     {
          double totalRating = 5.0;
          for (int i=0; i<allReviews.size(); i++)
          {
               totalRating += allReviews.get(i).getRating();
          }
          return Math.round((totalRating/(allReviews.size()+1)) * 10) / 10.0;
     }

     public void addReview(Review newReview)
     {
          this.allReviews.add(newReview);
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
          tour.put("basePrices", basePrices);
          tour.put("capacity", capacity);
          tour.put("rating", getRating());
          tour.put("allReviews", allReviews);
          return tour.toString();
     }
}
