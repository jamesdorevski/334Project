package com.Localite.restapp.model;

import com.mongodb.BasicDBObject;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Getter @Setter
@Document(collection="Disputes")
public class Dispute
{
    @Id private String _id;
    private Long dateCreated;
    private BasicDBObject tourist;
    private BasicDBObject tourguide;
//    private BasicDBObject tour;
    private String description;
    private String state = "open"; // open || close

    @Override
    public String toString()
    {
        JSONObject dispute = new JSONObject();
        dispute.put("dateCreated", dateCreated);
        dispute.put("tourist", tourist);
        dispute.put("tourguide", tourguide);
//        dispute.put("tour", tour);
        dispute.put("description", description);
        return dispute.toString();
    }
}
