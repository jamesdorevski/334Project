package com.Localite.restapp.repository;

import com.Localite.restapp.model.Conversation;
import com.mongodb.BasicDBObject;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MessageRepository extends MongoRepository<Conversation, String>
{
    @Query(value="{'users':{$in:[?0, ?1]}}")
    public Conversation findConversationByUsers(BasicDBObject sender, BasicDBObject receiver);

    @Query(value="{'users._id':{$in:[?0]}}")
    public ArrayList<Conversation> findConvoWithUserID(String userID);
}
