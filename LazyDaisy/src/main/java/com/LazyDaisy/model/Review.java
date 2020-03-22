package com.LazyDaisy.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.*;

@Builder
public class Review 
{
    @Getter @NonNull private Tourist reviewer;
    @Getter @NonNull private Date dateUploaded;
    @Getter @Setter @NonNull private Date dateUpdated;
    @Getter private String review;
}
