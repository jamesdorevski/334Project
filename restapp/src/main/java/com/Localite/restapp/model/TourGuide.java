package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class TourGuide extends Account
{
    @Getter @Setter
    private double rating = 5.0;

    @Builder
    public TourGuide(String firstName, String lastName, String email, String phoneNumber, ArrayList<String> languages) 
    {
        super("tour guide", firstName, lastName, email, phoneNumber, languages);

    }

    @Override
    public String toString()
    {
        return "{" +
                "id='" + get_id() + "\'" +
                ", firstName='" + getFirstName() + "\'" +
                ", lastName='" + getLastName() + "\'" +
                ", email='" + getEmail() + "\'" +
                ", phoneNumber='" + getPhoneNumber() + "\'" +
                ", rating='" + getRating() + "\'" +
                ", languagesSpoken='" + getLanguagesSpoken() + "\'}";
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
//        System.out.println(t1.toString());
//    }
}
