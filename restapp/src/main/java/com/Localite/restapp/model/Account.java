package com.Localite.restapp.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection="Users")
@Getter
@Setter
@NonNull
public class Account
{
    @Id private ObjectId _id;
    private String type;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private ArrayList<String> languagesSpoken;

    public Account(){this._id = new ObjectId();}

    public Account(String type, String firstName, String lastName, String email, String phoneNumber, ArrayList<String> languagesSpoken)
    {
        this.type = type;
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.email = email.trim();
        this.phoneNumber = phoneNumber;
        this.languagesSpoken = languagesSpoken;
    }

    public void setId(ObjectId id) {this._id = id;}

    @Override
    public String toString()
    {
        return "{" +
                "id='" + _id + "\'" +
                ", firstName='" + firstName + "\'" +
                ", lastName='" + lastName + "\'" +
                ", email='" + email + "\'" +
                ", phoneNumber='" + phoneNumber + "\'" +
                ", languagesSpoken='" + languagesSpoken + "\'}";
    }
}
