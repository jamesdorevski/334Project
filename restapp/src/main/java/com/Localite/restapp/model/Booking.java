package com.Localite.restapp.model;

import com.mongodb.BasicDBObject;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter @Setter
@Document(collection="Bookings")
public class Booking 
{
    @Id private String _id;
    private Long dateBooked;
    private BasicDBObject user;
    private BasicDBObject parties;
    private Tour tour;
    private String dietaryRequirement;
    private double totalPrice;

    public Booking(){}
}
