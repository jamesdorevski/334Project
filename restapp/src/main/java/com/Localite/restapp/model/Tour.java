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
//@Document(collection="Tours")
public class Tour 
{
     @Id private ObjectId _id;
     private Account tourGuide; // owner of tour
     private Location locationID;
     private String tourName;
     private double duration; //in hours
     private String description;
     private double basePrice;
     private int maxSize;
     private ArrayList<Review> allReview;

     public Tour() {}

     @Override
     public String toString()
     {
          JSONObject tour = new JSONObject();
          tour.put("_id", _id);
          return tour.toString();
     }
}
