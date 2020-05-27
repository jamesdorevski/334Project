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
    @Id private ObjectId _id;
    private BasicDBObject tourist;
    private Tour tour;
    private Long date;
    private String dietaryRequirement;

    public Booking(){}
}
