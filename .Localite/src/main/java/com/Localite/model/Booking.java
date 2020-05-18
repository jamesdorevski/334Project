package com.Localite.model;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Builder
@Getter
public class Booking 
{
    private Tourist tourist;
    private TourGuide tourGuide;
    private Tour tour;
    private Date date;
}
