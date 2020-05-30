package com.Localite.restapp.repository;

import com.mongodb.BasicDBObject;
import org.json.JSONArray;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;

import com.Localite.restapp.model.Tour;

import java.util.ArrayList;

@Repository
public interface TourRepository extends MongoRepository<Tour, String>
{
    public Tour findBy_id(ObjectId id);
    public void deleteBy_id(ObjectId id);

    @Query(value="{'location.city':?0, 'location.country':?1, " +
            "'startTour':{'$gt':?2}, 'endTour':{'$lt':?3}, " +
            "'capacity':{'$gte':?4}, 'maxLimit':false}")
    public ArrayList<Tour> findTours(String city, String country, Long startDate, Long endDate, int numOfPeople);

    @Query(value="{'tags':{$in:?0}, " +
            "'basePrices.adult':{'$gte':?1}, 'basePrices.adult':{'$lte':?2}, " +
            "'ratings':{'$gte':?3}, 'maxLimit':false}")
    public ArrayList<Tour> filterTours(ArrayList<String> tags, int minPrice, int maxPrice, int ratings);

    @Query(value="{'tourGuide._id':?0}")
    public ArrayList<Tour> findToursByTourguide(String id);
}
