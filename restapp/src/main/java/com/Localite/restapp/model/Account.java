package com.Localite.restapp.model;

import com.mongodb.BasicDBObject;
import lombok.*;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;

@Getter @Setter @NonNull
@Document(collection="Users")
@Component @SessionScope
public class Account
{
    @Id private ObjectId _id;
    private String type; // tourist || tourguide || both || admin
    private String firstName;
    private String lastName;
    private String email;
    private String hashbrown;
    private String phoneNumber;
    private ArrayList<String> languagesSpoken;
    private String gender;
    private String img; // https://blahblah.com
    private double rating = 5.0; // holds average that being calculated upon profile being viewed

    // Tourist

    // Tourguide
    private String licence;

    // admin stuff
    private Long banUntil = null;

    public Account(){}

    public Account(String type, String firstName, String lastName, String email, String hashbrown,
                   String phoneNumber, ArrayList<String> languagesSpoken,
                   String gender, String img)
    {
        this.type = type;
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.email = email.trim();
        this.hashbrown = hashbrown;
        this.phoneNumber = phoneNumber;
        this.languagesSpoken = languagesSpoken;
        this.gender = gender;
        this.img = img;
    }

    public BasicDBObject getSimpleUser()
    {
        BasicDBObject simple = new BasicDBObject();
        simple.put("_id", _id);
        simple.put("firstName", firstName);
        simple.put("lastName", lastName);
        simple.put("email", email);
        simple.put("gender", gender);
        simple.put("img", img);
        return simple;
    }

    @Override
    public String toString()
    {
        JSONObject user = new JSONObject();
        user.put("_id", _id);
        user.put("type", type);
        user.put("firstName", firstName);
        user.put("lastName", lastName);
        user.put("email", email);
        user.put("hashbrown", hashbrown);
        user.put("phoneNumber", phoneNumber);
        user.put("languagesSpoken", languagesSpoken);
        user.put("img", img);
        return user.toString();
    }
}
