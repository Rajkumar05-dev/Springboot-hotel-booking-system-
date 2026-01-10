package com.learn.Hotelbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learn.Hotelbooking.Entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(String userId);
    Optional<Booking> findByRazorpayOrderId(String razorpayOrderId);
}