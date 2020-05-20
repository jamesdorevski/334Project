package com.Localite.restapp.model;

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
    private JSONObject tourGuide;
    private JSONObject tourist;
    private Tour tour;
    private Long date; // timestamp
    private String dietaryStuff;
}
