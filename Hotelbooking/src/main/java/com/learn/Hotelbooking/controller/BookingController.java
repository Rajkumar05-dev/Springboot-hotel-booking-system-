package com.learn.Hotelbooking.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.learn.Hotelbooking.Dto.BookingDto;
import com.learn.Hotelbooking.service.BookingService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDto> create(@RequestBody BookingDto dto) {
        return ResponseEntity.ok(bookingService.createBooking(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDto>> getByUser(@PathVariable String userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }

    @GetMapping
    public ResponseEntity<List<BookingDto>> getAll() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    // 4️⃣ CONFIRM PAYMENT (🔥 IMPORTANT)
    @PostMapping("/confirm-payment")
    public ResponseEntity<String> confirmPayment(
            @RequestParam Long bookingId,
            @RequestParam String razorpayOrderId,
            @RequestParam String razorpayPaymentId,
            @RequestParam String razorpaySignature) throws RazorpayException {

        bookingService.ConfrimPayment(
                bookingId,
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature
        );

        return ResponseEntity.ok("Payment successful. Booking confirmed.");
    }
}   

