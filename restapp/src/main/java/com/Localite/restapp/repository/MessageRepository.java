package com.Localite.restapp.repository;

import com.Localite.restapp.model.Conversation;
import com.mongodb.BasicDBObject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Conversation, String>
{
    @Query(value="{'users':{$in:[?0, ?1]}}")
    public Conversation findConversationByUsers(BasicDBObject sender, BasicDBObject receiver);
}
