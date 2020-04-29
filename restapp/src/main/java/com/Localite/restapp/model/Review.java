package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.Date;

@Builder
@Getter
@NonNull
public class Review 
{
    private Tourist reviewer;
    private Date dateUploaded;
    @Setter private Date dateUpdated;
    private double rating;
    private String review;
}
