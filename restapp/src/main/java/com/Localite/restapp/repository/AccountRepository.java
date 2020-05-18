package com.Localite.restapp.repository;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Localite.restapp.model.Account;

@Repository
public interface AccountRepository extends MongoRepository<Account, String>
{
    public Account findByEmail(String email);
    public List<Account> findByFirstName(String firstName);
    public void deleteBy_id(ObjectId _id);    //maybe have it return bool instead of void?
    public void deleteByEmail(String email);  //maybe have it return bool instead of void?
}

