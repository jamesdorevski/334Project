package com.Localite.restapp.repository;

import com.mongodb.BasicDBObject;
import org.springframework.data.mongodb.repository.MongoRepository;
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
  public ArrayList<Tour> findByLocation(BasicDBObject location);
}
