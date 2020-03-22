package com.LazyDaisy.model;

import lombok.Builder;
import lombok.Getter;

@Builder
public class Booking 
{
    @Getter private Tourist tourist;
    @Getter private TourGuide tourGuide;
    @Getter private Tour tour;
}
