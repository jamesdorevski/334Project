package com.Localite.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Localite.model.Account;

@Repository
public interface AccountRepository extends MongoRepository<Account, String>
{
	
}
