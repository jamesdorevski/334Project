package com.LazyDaisy.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import java.util.*;

@Builder
public class Tour 
{

    @Getter @Setter @NonNull private String TourName;
    @Getter @Setter @NonNull private TourGuide tourGuide;
    @Getter @Setter private double duration; //in hours
    @Getter @Setter @NonNull private String description;
    @Getter @Setter @NonNull private double basePrice;
    @Getter @Setter @NonNull private boolean autoApprove;
    @Getter @Setter private int maxSize;
    @Getter @Setter @NonNull private ArrayList<String> tags;
    @Getter @Setter @NonNull private ArrayList<Review> reviews;
    
//    public static void main(String[] args) {
//        //test tour
//        ArrayList<String> tags = new ArrayList<String>();
//        tags.add("Food");
//        tags.add("Day Tour");
//        tags.add("Good for Kids");
//
//        ArrayList<String> langs = new ArrayList<String>();
//        langs.add("English");
//        langs.add("Spanish");
//        TourGuide tGuide = new TourGuide("Emily", "Cruz", "ecruz@colgate.edu", "+1 (623) 555-5555", langs);
//
//        Tour t1 = Tour.builder()
//                .tourName("Local Italian Food Tour")
//                .tourGuide(tGuide)
//                .description("Join us for a lovely food tour of Florence Italy. Our tour will start at ..., where we will ... We will end the night with what else- gelato!")
//                .basePrice(40.00)
//                .autoApprove(true)
//                .tags(tags)
//                .reviews(new ArrayList<>())
//                .build();
//
//        System.out.println(t1.getTourName());
//        System.out.println(t1.getTourGuide());
//        System.out.println(t1.getDescription());
//    }
}
