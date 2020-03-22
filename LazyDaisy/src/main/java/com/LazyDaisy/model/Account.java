package com.LazyDaisy.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document
public class Account 
{
	@Id private ObjectId _id;
	@Getter @Setter private String firstname;
	@Getter @Setter private String lastname;
	@Getter @Setter private String username;
	@Getter @Setter private String email;
	
	public Account(){this._id = new ObjectId();}
	
	public Account(String firstname, String lastname, String username, String email)
	{
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.email = email;
	}
	
	public void setId(ObjectId id) {this._id = id;}

	@Override
	public String toString()
	{
		return "Account {" +
                "id='" + _id + "\'" +
                ", firstname='" + firstname + "\'" +
                ", lastname='" + lastname + "\'" +
                ", username='" + username + "\'" +
                ", email='" + email + "\'}";
	}
}
