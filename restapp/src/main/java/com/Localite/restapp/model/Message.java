package com.Localite.restapp.model;

import com.mongodb.BasicDBObject;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Message
{
    private BasicDBObject sender;
    private String content;

    public Message(){}
}
