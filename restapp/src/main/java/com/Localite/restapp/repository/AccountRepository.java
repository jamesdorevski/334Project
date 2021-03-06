package com.Localite.restapp.repository;
import java.util.ArrayList;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Localite.restapp.model.Account;

@Repository
public interface AccountRepository extends MongoRepository<Account, String>
{
    public Account findByEmail(String email);
    public Account findBy_id(ObjectId id);
    public List<Account> findByFirstName(String firstName);
    public ArrayList<Account> findByType(String type);
    public void deleteBy_id(ObjectId id);
    public void deleteByEmail(String email);
}

