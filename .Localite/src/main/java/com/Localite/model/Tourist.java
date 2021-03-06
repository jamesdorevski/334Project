package com.Localite.model;

import lombok.Builder;

import java.util.*;

public class Tourist extends Account
{

	public Tourist() {}

    @Builder
    public Tourist(String firstName, String lastName, String email, String phoneNumber, ArrayList<String> languages) 
    {
        super(firstName, lastName, email, phoneNumber, languages);
    }

    @Override
    public String toString()
    {
        return "{"
                + "id='" + get_id() + "\'"
                + ", firstName='" + getFirstName() + "\'"
                + ", lastName='" + getLastName() + "\'"
                + ", email='" + getEmail() + "\'"
                + ", phoneNumber='" + getPhoneNumber() + "\'"
                /* + ", rating='" + getRating() + "\'" */
                + ", languagesSpoken='" + getLanguagesSpoken() + "\'"
                + "}";
    }

//    public static void main(String[] args)
//    {
//        //test guide
//        ArrayList<String> langs = new ArrayList<String>();
//        langs.add("English");
//        langs.add("Spanish");
//
//        Tourist t1 = Tourist.builder()
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
