package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
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
     private Account tourGuide; // owner of tour
     private Location location;
     private String tourName;
     private double tourDuration; //in hours
     private String tourDescription;
     private double basePrice;
     private int groupLimit;
     private ArrayList<Review> tourReviews;

     public Tour(Account tourGuide, Location location, String tourName, double tourDuration, String tourDescription, double basePrice, int groupLimit) {
          this.tourGuide = tourGuide;
          this.location = location;
          this.tourName = tourName;
          this.tourDuration = tourDuration;
          this.tourDescription = tourDescription;
          this.basePrice = basePrice;
          this.groupLimit = groupLimit;
     }

     @Override
     public String toString()
     {
          JSONObject tour = new JSONObject();
          tour.put("_id", _id);
          return tour.toString();
     }
}
