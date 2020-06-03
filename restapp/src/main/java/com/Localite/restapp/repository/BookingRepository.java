package com.Localite.restapp.repository;

import com.Localite.restapp.model.Booking;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String>
{
    @Query(value="{'user._id':?0, 'tour._id':?1}", delete=true)
    public void deleteBooking(String touristID, ObjectId tourID);

    // to check if booking for this tourist exist
    @Query(value="{'tour._id':?0, 'tourist._id':?1}", count=true)
    public int findByTourist(ObjectId tourID, ObjectId userID);

    @Query(value="{'tour._id':?0}", count=true)
    public ArrayList<Booking> getTourBookings(ObjectId tourID);

    @Query(value="{'user._id':?0}", count=true)
    public int touristInTour(String touristID);

    @Query(value="{'user._id':?0}")
    public ArrayList<Booking> getTouristBookings(String userID);
}
