package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Builder
@Getter @Setter
@Document(collection="Tours")
public class Tour 
{
     private Account tourGuide; // owner of tour
     private Location location;
     private String tourName;
     private double duration; //in hours
     private String description;
     private double basePrice;
     private int maxSize;
     private ArrayList<Review> allReview;
}
