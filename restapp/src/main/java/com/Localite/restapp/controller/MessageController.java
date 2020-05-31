package com.Localite.restapp.controller;

import com.Localite.restapp.model.Conversation;
import com.Localite.restapp.model.Message;
import com.Localite.restapp.repository.AccountRepository;
import com.Localite.restapp.repository.MessageRepository;
import com.mongodb.BasicDBObject;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/messages")
public class MessageController
{
    @Autowired MessageRepository messageRepository;
    @Autowired AccountRepository accountRepository;
    private boolean debug = true;

    @GetMapping("/{userID}")
    public String getAllConvos(@PathVariable String userID)
    {
        JSONObject result = new JSONObject();
        try
        {
            ArrayList<Conversation> allConvos = messageRepository.findConvoWithUserID(userID);
            result.put("allConvos", allConvos);
            result.put("success", true);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to retrieve conversations");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }
    @GetMapping("/conversation/{senderID}/{receiverID}")
    public String getConversation(@PathVariable ObjectId senderID,
                              @PathVariable ObjectId receiverID) throws Exception
    {
        JSONObject result = new JSONObject();

        try
        {
            BasicDBObject sender = accountRepository.findBy_id(senderID).getBasicUser();
            BasicDBObject receiver = accountRepository.findBy_id(receiverID).getBasicUser();
            Conversation convo = messageRepository.findConversationByUsers(sender, receiver);

            result.put("conversation", convo);
            result.put("success", true);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to send message");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }
    @PostMapping("/sendMessage/{senderID}/{receiverID}")
    public String sendMessage(@PathVariable ObjectId senderID,
                              @PathVariable ObjectId receiverID,
                              @RequestBody Message newMessage) throws Exception
    {
        JSONObject result = new JSONObject();

        try
        {
            BasicDBObject sender = accountRepository.findBy_id(senderID).getBasicUser();
            newMessage.setSender(sender);

            BasicDBObject receiver = accountRepository.findBy_id(receiverID).getBasicUser();
            Conversation convo = messageRepository.findConversationByUsers(sender, receiver);

            if(convo == null)
            {
                Conversation newConvo = new Conversation();

                // adding users in conversation
                ArrayList<BasicDBObject> users = new ArrayList<>();
                users.add(sender);
                users.add(receiver);
                newConvo.setUsers(users);

                // adding new message in conversation
                newConvo.addMessage(newMessage);

                // creating conversation
                messageRepository.insert(newConvo);
            }
            else // conversation exists
            {
                convo.addMessage(newMessage);
                messageRepository.save(convo);
            }

            result.put("success", true);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to send message");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }
}
