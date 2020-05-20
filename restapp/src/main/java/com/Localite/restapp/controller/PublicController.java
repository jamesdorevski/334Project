package com.Localite.restapp.controller;

import com.Localite.restapp.model.Tour;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import javax.security.auth.x500.X500Principal;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/")
public class PublicController {

    private boolean debug = true;

    @PostMapping(path = "/search")
    public ArrayList<Tour> getTours(@RequestBody String input) {
        
        JSONObject search = new JSONObject(input);
        System.out.println(search);

        // Write search query here
        

        // return list of tours to display on frontend
        return new ArrayList<Tour>();
    }
}
