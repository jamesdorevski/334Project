package com.Localite.restapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
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
    public Object createUser(@RequestBody Account newAccount) throws Exception
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
            return result;
        }
    }

    @GetMapping(path = "/login")
    public Object loginUser(@RequestParam("email") String email,
                            @RequestParam("password") String password) throws Exception
    {

        JSONObject result = new JSONObject();
        try
        {
            Account user = repository.findByEmail(email); // getting user from database

            if(user != null) // user exists
            {
                boolean authenticate = bcrypt.matches(password, user.getHashbrown()); //authenticate user login using database

                if (authenticate)
                {
                    if (debug) System.out.println("User has logged in");
                    sessionUser = user; // adding user to session??

                    result.put("message", "User has logged in");
                    result.put("success", true);
                    return result;
                }
                else
                {
                    if (debug) System.out.println("Invalid login");
                    result.put("message", "Invalid login");
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
            result.put("message", "Error with login");
            result.put("success", false);
        }
        finally
        {
            return result;
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