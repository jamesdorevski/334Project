package com.Localite.restapp.model;

import lombok.*;
import org.bson.types.ObjectId;
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
    private String type;
    private String firstName;
    private String lastName;
    private String email;
    private String hashbrown;
    private String phoneNumber;
    private ArrayList<String> languagesSpoken;

    public Account(){}

    public Account(String type, String firstName, String lastName, String email, String hashbrown, String phoneNumber, ArrayList<String> languagesSpoken)
    {
        this.type = type;
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.email = email.trim();
        this.hashbrown = hashbrown;
        this.phoneNumber = phoneNumber;
        this.languagesSpoken = languagesSpoken;
    }

    @Override
    public String toString()
    {
        return "{" +
                "\"_id\":" + _id + "\"" +
                ",\"type\":" + type + "\"" +
                ",\"firstName\":" + firstName + "\"" +
                ",\"lastName\":" + lastName + "\"" +
                ",\"email\":" + email + "\"" +
                ",\"hashbrown\":" + hashbrown + "\"" +
                ",\"phoneNumber\":" + phoneNumber + "\"" +
                ",\"languagesSpoken\":" + languagesSpoken + "\"" +
                "}";
    }
}
