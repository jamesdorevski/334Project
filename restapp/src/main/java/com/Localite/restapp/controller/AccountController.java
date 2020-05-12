package com.Localite.restapp.controller;

import com.Localite.restapp.model.Account;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.Localite.restapp.repository.AccountRepository;

import java.io.IOException;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/account")
public class AccountController {
    @Autowired private PasswordEncoder bcrypt;
    @Autowired private AccountRepository repository;
    @Autowired private Account sessionUser;

    @PostMapping("/create")
    public Object createUser(@RequestBody Account newAccount) {
//        ======== SAMPLE ========
//        account = {"type":"null","firstName":Poppy","lastName":White","email":pops@gmail.com","password":asfdg", "phoneNumber":046812","languagesSpoken":[]"}
//        ======== SAMPLE ========
        JSONObject result = new JSONObject();
        try {
            // hashing password
            newAccount.setHashbrown(bcrypt.encode(newAccount.getHashbrown()));

            // storing in database
            repository.insert(newAccount);
            System.out.println("Account created");

            // returning results
            result.put("message", "Account created");
            result.put("success", true);
        } catch (Exception e) {
            result.put("message", "Email already exists");
            result.put("success", false);
        } finally {
            return result;
        }
    }

    @GetMapping(path = "/login")
    public Account loginUser(@RequestParam("email") String email,
                             @RequestParam("password") String password) throws IOException {

        // getting user from database
        Account user = repository.findByEmail(email);

        if(user != null)
        {
            //authenticate user login using database
            boolean authenticate = bcrypt.matches(password, user.getHashbrown());

            if (authenticate)
            {
                sessionUser = user;
                System.out.println("User has logged in");
                return user;
            }
            else
                System.out.println("Invalid login");
        }
        else
            System.out.println("User does not exist");

        return new Account();
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