package com.learn.Hotelbooking.service;

import java.util.List;

import com.learn.Hotelbooking.Dto.BookingDto;
import com.razorpay.RazorpayException;

public interface BookingService {
	

	    BookingDto createBooking(BookingDto dto);

	    List<BookingDto> getBookingsByUser(String userId);

	    List<BookingDto> getAllBookings();
	    void ConfrimPayment(Long bookingId,
	            String razorpayOrderId,
	            String razorpayPaymentId,
	            String razorpaySignature) throws RazorpayException;

}
