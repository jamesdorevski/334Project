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
     @Id private ObjectId _id;
     private BasicDBObject tourGuide; // owner of tour
     private String name;
     private BasicDBObject location;
     private Long startTour;
     private Long endTour;

     private String description;
     private double basePrice;
     private int groupLimit;

     private ArrayList<Review> allReviews = new ArrayList<>();
     private double rating;

     public Tour(BasicDBObject tourGuide, String name, BasicDBObject location,
                 Long startTour, Long endTour,
                 String description, double basePrice, int groupLimit)
     {
          this.tourGuide = tourGuide;
          this.location = location;
          this.name = name;
          this.startTour = startTour;
          this.endTour = endTour;
          this.description = description;
          this.basePrice = basePrice;
          this.groupLimit = groupLimit;
     }

     public int getDurationInHours()
     {
          return (int) Math.ceil((startTour-endTour)/3600000);
     }

     public void calcAvgRating()
     {
          double totalRating = 5.0;
          for (int i=0; i<allReviews.size(); i++)
          {
               totalRating += allReviews.get(i).getRating();
          }
          this.rating = Math.round((totalRating/allReviews.size()) * 10) / 10.0;
     }

     public void addReview(Review newReview)
     {
          this.allReviews.add(newReview);
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
          tour.put("basePrice", basePrice);
          tour.put("groupLimit", groupLimit);
          return tour.toString();
     }
}
