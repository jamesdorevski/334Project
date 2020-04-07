package com.Localite.model;

import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Document(collection="Users")
@Getter 
@Setter
@NonNull
public abstract class Account
{
	@Id private ObjectId _id;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private ArrayList<String> languagesSpoken;
	
	public Account(){this._id = new ObjectId();}
	
	public Account(String firstName, String lastName, String email, String phoneNumber, ArrayList<String> languagesSpoken)
	{
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
