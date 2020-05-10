package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Builder
@Getter
public class Booking 
{
    private Account tourist;
    private Account tourGuide;
    private Tour tour;
    private Date date;
}
