package com.Localite.restapp.model;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Getter @Setter @NonNull
@Document(collection="FAQ")
public class FAQ
{
    @Id private String _id;
    private String question;
    private String answer;

    FAQ(){}

    @Override
    public String toString()
    {
        JSONObject faq = new JSONObject();
        faq.put("question", question);
        faq.put("answer", answer);
        return faq.toString();
    }
}
