package com.Localite.repository;

//import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
//import org.bson.types.ObjectId;

import com.Localite.model.Account;

@Repository
public interface AccountRepository extends MongoRepository<Account, String>
{
 // public List<Account> findByEmail(String email);
 // public List<Account> findByFirstName(String firstName);
  //public void deleteBy_id(ObjectId _id);
  public void deleteByEmail(String email); 

}
