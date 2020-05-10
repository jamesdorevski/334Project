package com.Localite.restapp.controller;

import com.Localite.restapp.model.Account;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.Localite.restapp.repository.AccountRepository;

import java.io.IOException;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/account")
public class AccountController {
    @Autowired
    private PasswordEncoder bcrypt;
    private AccountRepository repository;

    @PostMapping("/create")
    public Object createUser(@RequestBody Account newAccount) throws Exception {
//        ======== SAMPLE ========
//        account = {"type":"null","firstName":Poppy","lastName":White","email":pops@gmail.com","password":asfdg", "phoneNumber":046812","languagesSpoken":[]"}
//        ======== SAMPLE ========
        JSONObject result = new JSONObject();
        try {

            // hashing password
            newAccount.setHashbrown(bcrypt.encode(newAccount.getHashbrown()));

            // storing in database
            repository.insert(newAccount);

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
        System.out.println(email + " | " + password);

        // getting user from database
        //Account user = repository.findByEmail(email);

        //authenticate user login using database
//        boolean authenticate = bcrypt.matches(password, user.getHashbrown());
//        System.out.println(authenticate);
        return new Account();
    }

        // NOTE: I don't need this if I'm given an object as shown in SAMPLE ~ Le Anne
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