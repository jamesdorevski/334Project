package com.Localite.restapp.model;

import lombok.Builder;

import java.util.ArrayList;

public class Tourist extends Account
{

    @Builder
    public Tourist(String firstName, String lastName, String email, String phoneNumber, ArrayList<String> languages) 
    {
        //super("tourist", firstName, lastName, email, phoneNumber, languages);
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
