package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NonNull
public class Location {
    @Id private ObjectId _id;
    private String city;
    private String country;

    @Builder
    public Location(String country, String city){
       this.country = country;
       this.city = city;
    }
}
