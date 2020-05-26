package com.Localite.restapp.repository;

import com.mongodb.BasicDBObject;
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
  public ArrayList<Tour> findByName(String name);

  @Query(value="{'location.city':?0}, {'location.country':?1}, {'maxLimit:true}")
  public ArrayList<Tour> findTours(String city, String country);

  @Query(value="{'tourGuide._id':?0}")
  public ArrayList<Tour> findAllByTourGuide(ObjectId id);
}
