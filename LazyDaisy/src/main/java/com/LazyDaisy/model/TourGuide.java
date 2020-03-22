package com.LazyDaisy.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

public class TourGuide extends User
{
    @Getter @Setter
    private double rating = 5.0;

    @Builder
    public TourGuide(String firstName, String lastName, String email, String phoneNumber, ArrayList<String> languages) 
    {
        super(firstName, lastName, email, phoneNumber, languages);

    }

//    public static void main(String[] args) 
//    {
//        //test tour guide
//        ArrayList<String> langs = new ArrayList<String>();
//        langs.add("English");
//        langs.add("Spanish");
//
//        TourGuide t1 = TourGuide.builder()
//                .firstName("Emily")
//                .lastName("Cruz")
//                .email("ecruz@colgate.edu")
//                .phoneNumber("+1 (623) 555-5555")
//                .languages(langs)
//                .build();
//
//        System.out.println(t1.getFirstName());
//        System.out.println(t1.getEmail());
//        System.out.println(t1.getPhoneNumber());
//        System.out.println(t1.getLanguages());
//        System.out.println(t1.getRating());
//    }
}
