package com.Localite.restapp.repository;

import com.Localite.restapp.model.Dispute;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisputeRepository extends MongoRepository<Dispute, String>
{

}
