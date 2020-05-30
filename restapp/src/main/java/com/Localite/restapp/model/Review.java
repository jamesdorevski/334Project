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

@Setter @Getter
@Document(collection="Reviews")
public class Review 
{
    @Id private String _id;
    private Long dateCreated; // timestamp
    private BasicDBObject reviewer;

    // object is that being reviewed
    private BasicDBObject reviewee;
    private Tour tour;

    private String title;
    private String description;
    private double ratings;

    @Builder
    public Review(BasicDBObject reviewer, BasicDBObject reviewee, Long dateCreated, String title, double ratings, String description)
    {
        this.reviewer = reviewer;
        this.reviewee = reviewee;
        this.dateCreated = dateCreated;
        this.ratings = ratings;
        this.description = description;
        this.title = title;
    }

    @Override
    public String toString()
    {
        JSONObject review = new JSONObject();
        review.put("_id", _id);
        review.put("dateCreated", dateCreated);
        review.put("reviewer", reviewer);
        review.put("reviewee", reviewee);
        review.put("title", title);
        review.put("description", description);
        review.put("ratings", ratings);
        return review.toString();
    }
}
