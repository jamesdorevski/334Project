package com.Localite.restapp.model;

import com.mongodb.BasicDBObject;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Setter @Getter @NonNull
@Document(collection="Reviews")
public class Review 
{
    @Id private ObjectId _id;
    private BasicDBObject reviewer; // GetSimpleUser()
    private Long dateCreated; // timestamp
    private double rating;
    private String description;

    // OPTIONAL
    private Long dateUpdated; // timestamp
    private ObjectId tourID; // if a tour review
    private BasicDBObject reviewee; // if a tourguide review GetSimpleUser()

    @Builder
    public Review(BasicDBObject reviewer, Long dateCreated, double rating, String description)
    {
        this.reviewer = reviewer;
        this.dateCreated = dateCreated;
        this.rating = rating;
        this.description = description;
    }


}
