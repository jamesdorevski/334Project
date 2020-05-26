package com.Localite.restapp.repository;

import com.Localite.restapp.model.Booking;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String>
{
    @Query(value="{'tour._id':?0}", count=true)
    public int countBookings(ObjectId tourID);

    @Query(value="{'tour._id':?0}, {'tourist._id':?1}", count=true)
    public int findByTourist(ObjectId tourID, ObjectId userID);
}
