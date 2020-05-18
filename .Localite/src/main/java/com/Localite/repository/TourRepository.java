package com.Localite.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.bson.types.ObjectId;

import com.Localite.model.Tour;

@Repository
public interface TourRepository extends MongoRepository<Tour, String>
{
  public List<Tour> findByTourName(String tourName);
  public void deleteBy_id(ObjectId _id);
}
