package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Setter @Getter @NonNull
@Document(collection="Reviews")
public class Review 
{
    private Account reviewer; // GetSimpleUser()
    private Long dateCreated; // timestamp
    private double rating;
    private String description;

    private Long dateUpdated; // timestamp

    @Builder
    public Review(Account reviewer, Long dateCreated, double rating, String description)
    {
        this.reviewer = reviewer;
        this.dateCreated = dateCreated;
        this.rating = rating;
        this.description = description;
    }
}
