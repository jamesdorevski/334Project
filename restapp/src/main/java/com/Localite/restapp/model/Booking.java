package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Getter @Setter
@Document(collection="Bookings")
public class Booking 
{
    private Account tourGuide;
    private Account tourist;
    private Tour tour;
    private Long date; // timestamp
    private String dietaryStuff;
}
