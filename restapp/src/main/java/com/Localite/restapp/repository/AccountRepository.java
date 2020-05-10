package com.Localite.restapp.repository;

import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Localite.restapp.model.Account;


@Repository
public interface AccountRepository extends MongoRepository<Account, String>
{
    public Account findByEmail(String email);
}
