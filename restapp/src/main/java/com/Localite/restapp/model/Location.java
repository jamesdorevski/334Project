package com.Localite.restapp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@NonNull
public class Location {
    private String city;
    private String country;

    @Builder
    public Location(String country, String city){
       this.country = country;
       this.city = city;
    }
}
