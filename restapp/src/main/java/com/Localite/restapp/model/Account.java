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
    private String gender;
    private String img; // https://blahblah.com
    private ArrayList<String> languagesSpoken;
    private ArrayList<Review> allReviews = new ArrayList<>();

    // Tourist
    private ArrayList<Booking> allBookings = new ArrayList<>();

    // Tourguide
    private String licence;

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

    public BasicDBObject getBasicUser() // placed in tours
    {
        BasicDBObject simple = new BasicDBObject();
        simple.put("_id", _id.toString());
        simple.put("firstName", firstName);
        simple.put("lastName", lastName);
        simple.put("email", email);
        simple.put("img", img);
        return simple;
    }

    public BasicDBObject getProfileUser() // view user profile
    {
        BasicDBObject profile = new BasicDBObject();
        profile.put("_id", _id.toString());
        profile.put("type", type);
        profile.put("firstName", firstName);
        profile.put("lastName", lastName);
        profile.put("gender", gender);
        profile.put("img", img);
        profile.put("rating", getRating());
        profile.put("languagesSpoken", languagesSpoken);
        profile.put("allReviews", allReviews);
        return profile;
    }

    public double getRating()
    {
        double totalRating = 5.0;
        for (int i=0; i<allReviews.size(); i++)
        {
            totalRating += allReviews.get(i).getRating();
        }
        return Math.round((totalRating/(allReviews.size()+1)) * 10) / 10.0;
    }

    public void addReview(Review newReview)
    {
        this.allReviews.add(newReview);
    }

    public void addBooking(Booking newBooking)
    {
        this.allBookings.add(newBooking);
    }

    public void update(Account newInfo)
    {
        if (newInfo.type != null)
            this.type = newInfo.type;

        if (newInfo.firstName != null)
            this.firstName = newInfo.firstName;

        if (newInfo.lastName != null)
            this.lastName = newInfo.lastName;

        if (newInfo.email != null)
            this.email = newInfo.email;

        if (newInfo.hashbrown != null)
            this.hashbrown = newInfo.hashbrown;

        if (newInfo.phoneNumber != null)
            this.phoneNumber = newInfo.phoneNumber;

        if (newInfo.gender != null)
            this.gender = newInfo.gender;

        if (newInfo.img != null)
            this.img = newInfo.img;

        if (newInfo.languagesSpoken != null)
            this.languagesSpoken = newInfo.languagesSpoken;

        // Tourguide
        if (newInfo.licence != null)
            this.licence = newInfo.licence;
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
        user.put("gender", gender);
        user.put("hashbrown", hashbrown);
        user.put("phoneNumber", phoneNumber);
        user.put("languagesSpoken", languagesSpoken);
        user.put("img", img);
        return user.toString();
    }
}
