package com.Localite.restapp.repository;

import com.Localite.restapp.model.FAQ;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface FAQRepository extends MongoRepository<FAQ, String>
{
    public ArrayList<FAQ> findAll();
    public void deleteBy_id(ObjectId _id);
}
