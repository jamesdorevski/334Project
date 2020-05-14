package com.Localite.restapp.controller;

import com.mongodb.util.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.json.JSONObject;

import com.Localite.restapp.model.Account;
import com.Localite.restapp.repository.AccountRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/account")
public class AccountController {
    @Autowired private PasswordEncoder bcrypt;
    @Autowired private AccountRepository repository;
    @Autowired private Account sessionUser;
    private boolean debug = true;

    @PostMapping("/create")
    public String createUser(@RequestBody Account newAccount) throws Exception
    {
        JSONObject result = new JSONObject();
        try
        {
            newAccount.setHashbrown(bcrypt.encode(newAccount.getHashbrown())); // hashing password
            repository.insert(newAccount); // storing in database
            if (debug) System.out.println("Account created");

            result.put("message", "Account created");
            result.put("success", true);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Error creating new account");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping(path = "/login")
    public String loginUser(@RequestBody String input) throws Exception
    {
        //can test with email: popo@gmail.com, password: admin

        JSONObject login = new JSONObject(input);
        JSONObject result = new JSONObject();
        try
        {
            Account user = repository.findByEmail(login.getString("email")); // getting user from database

            if(user != null) // user exists
            {
                boolean authenticate = bcrypt.matches(login.getString("password"), user.getHashbrown()); //authenticate user login using database

                if (authenticate)
                {
                    if (debug) System.out.println("User has logged in");
                    sessionUser = user; // adding user to session??

                    result.put("user", user.toString());
                    result.put("success", true);
                    return result.toString();
                }
                else
                {
                    if (debug) System.out.println("Incorrect email or password");
                    result.put("message", "Incorrect email or password");
                }
            }
            else
            {
                if (debug) System.out.println("User does not exist");
                result.put("message", "User does not exist");
            }

            result.put("success", false);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Network Error");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }
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