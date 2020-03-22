package com.LazyDaisy.model;

import lombok.*;
import java.util.*;

public abstract class User 
{
    @NonNull private String firstName = "";
    @NonNull private String lastName = "";
    @Setter @NonNull private String email = "";
    @Setter @NonNull private String phoneNumber = "";
    @Setter @NonNull private ArrayList<String> languages;

    //constructor
    public User(String fName, String lName, String userEmail, String number, ArrayList<String> languagesSpoken) {
        firstName = fName.trim();
        lastName = lName.trim();
        email = userEmail.trim();
        phoneNumber = number;
        languages = languagesSpoken;
    }
}
