package com.Localite.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection="Users")
@Getter 
@Setter
public class Account 
{
	@Id private ObjectId _id;
	private String firstname;
	private String lastname;
	private String username;
	private String email;
	
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
		return "{" +
                "id='" + _id + "\'" +
                ", firstname='" + firstname + "\'" +
                ", lastname='" + lastname + "\'" +
                ", username='" + username + "\'" +
                ", email='" + email + "\'}";
	}
}
