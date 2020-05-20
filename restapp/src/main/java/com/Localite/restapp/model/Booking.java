package com.Localite.restapp.model;

import com.mongodb.BasicDBObject;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Getter @Setter
@Document(collection="Bookings")
public class Booking 
{
    @Id private ObjectId _id;
    private BasicDBObject tourGuide;
    private BasicDBObject tourist;
    private Tour tour;
    private Long date; // timestamp
    private String dietaryStuff;
}
