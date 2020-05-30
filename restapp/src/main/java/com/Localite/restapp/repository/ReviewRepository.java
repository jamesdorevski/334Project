package com.Localite.restapp.repository;

import com.Localite.restapp.model.Review;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String>
{
    @Query(value="{'reviewer._id':?0, 'tour':{$exists:true}}")
    public ArrayList<Review> getTourReviewByReviewerID(String reviewerID);

    @Query(value="{'reviewer._id':?0, 'reviewee':{$exists:true}}")
    public ArrayList<Review> getGuideReviewByReviewerID(String reviewerID);

    @Query(value="{'reviewee._id':?0}")
    public ArrayList<Review> getByRevieweeID(String revieweeID);

    @Query(value="{'tour._id':?0}")
    public ArrayList<Review> getByTourID(ObjectId tourID);
}
