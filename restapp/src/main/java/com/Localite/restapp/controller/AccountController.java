package com.Localite.restapp.controller;


import com.Localite.restapp.model.Account;
import com.Localite.restapp.model.TourGuide;
import com.Localite.restapp.model.Tourist;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Localite.restapp.repository.AccountRepository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value = "/account", method = RequestMethod.GET)
public class AccountController
{
    @Autowired
    private AccountRepository repository;

    @GetMapping(path="/login") //THIS WILL END UP BEING SECURE W SPRING SECURITY AND AUTHENTICATION
    public Account loginUser(@RequestParam String email, @RequestParam String password){

        //authenticate user login using database

        //if successful, return user's account info
        //hardcoded bc idk how to get info from mongo
        ArrayList<String> langs = new ArrayList<String>();
        langs.add("English");
        langs.add("Spanish");

        Tourist test = new Tourist(
                "Emily",
                "Cruz",
                "eruz@gmail.com",
                "+1 (623) 555-5555",
                langs

        );

        return test;
    }

//    //get a specific Account's information - by email or by ID?
////    public Account getUserInfo(String email){
////        return null;
////    }

    //IDK what this should return - either ResponseEntity or the user info
    @PostMapping("/create")
    public void createUser(@RequestBody Account account){
        System.out.println(account);
        //create the new account and add it to the database
//        Account newAccount;
//        if (type.equals("tour guide")){
//            newAccount = TourGuide.builder()
//                    .firstName(firstName)
//                    .lastName(lastName)
//                    .phoneNumber(phoneNumber)
//                    .email(email)
//                    .languages(languagesSpoken)
//                    .build();
//
//        } else {
//            newAccount = Tourist.builder().firstName(firstName)
//                    .lastName(lastName)
//                    .phoneNumber(phoneNumber)
//                    .email(email)
//                    .languages(languagesSpoken)
//                    .build();
//        }

        //return location of created entity
        //get current resource url
//        URI uri = ServletUriComponentsBuilder
//                .fromCurrentRequest().path("/{id}")
//                .buildAndExpand(newAccount.get_id()).toUri();
//
//        return ResponseEntity.created(uri).build();
    }


//    @DeleteMapping(path="/delete")
//    public ResponseEntity<Void> delete(){
//        //find account in the database by ID and delete
//
//        //if delete was successful
//        if(){
//
//            return ResponseEntity.noContent().build();
//        }
//        //not found status
//        return ResponseEntity.notFound().build();
//    }

}