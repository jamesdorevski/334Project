package com.Localite.restapp.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;

@Getter @Setter
@Document(collection="Users")
@Component @SessionScope
public class Account
{
    @Id private ObjectId _id;
    @NonNull private String type; // tourist || tourguide || both || admin
    @NonNull private String firstName;
    @NonNull private String lastName;
    @NonNull private String email;
    @NonNull private String hashbrown;
    @NonNull private String phoneNumber;
    @NonNull private ArrayList<String> languagesSpoken;

    // Tourist

    // Tourguide
    private String licence;


    // admin stuff
    private Long banUntil = null;

    public Account(){}

    public Account(String firstName, String lastName, String email, String hashbrown, String phoneNumber, ArrayList<String> languagesSpoken)
    {
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.email = email.trim();
        this.hashbrown = hashbrown;
        this.phoneNumber = phoneNumber;
        this.languagesSpoken = languagesSpoken;
    }

    public String getSimpleUser()
    {
        JSONObject simple = new JSONObject();
        simple.put("_id", _id);
        simple.put("firstName", firstName);
        simple.put("lastName", lastName);
        simple.put("email", email);
        return simple.toString();
    }

    @Override
    public String toString()
    {
        JSONObject user = new JSONObject();
        user.put("_id", _id);
        user.put("firstName", firstName);
        user.put("lastName", lastName);
        user.put("email", email);
        user.put("hashbrown", hashbrown);
        user.put("phoneNumber", phoneNumber);
        user.put("languagesSpoken", languagesSpoken);
        return user.toString();
    }
}
