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
public class Review 
{
    @Id private String _id;
    private Long dateCreated; // timestamp
    private double rating;
    private BasicDBObject reviewer; // GetSimpleUser()
    private String description;

    @Builder
    public Review(BasicDBObject reviewer, Long dateCreated, double rating, String description)
    {
        this.reviewer = reviewer;
        this.dateCreated = dateCreated;
        this.rating = rating;
        this.description = description;
    }

    @Override
    public String toString()
    {
        JSONObject review = new JSONObject();
        review.put("_id", _id);
        review.put("dateCreated", dateCreated);
        review.put("rating", rating);
        review.put("reviewer", reviewer);
        review.put("description", description);
        return review.toString();
    }
}
