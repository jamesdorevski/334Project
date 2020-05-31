package com.Localite.restapp.model;
import com.mongodb.BasicDBObject;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.ArrayList;

@Getter @Setter
@Document(collection="Conversations")
public class Conversation
{
    @Id String _id;
    ArrayList<BasicDBObject> users = new ArrayList<>();
    ArrayList<Message> messages = new ArrayList<>();

    public Conversation(){}

    public void addMessage(Message message)
    {
        messages.add(message);
    }

    @Override
    public String toString()
    {
        JSONObject convo = new JSONObject();
        convo.put("_id", _id);
        convo.put("users", users);
        convo.put("messages", messages);
        return convo.toString();
    }
}
