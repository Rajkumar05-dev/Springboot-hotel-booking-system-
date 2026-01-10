package com.learn.Hotelbooking.Entities;



import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // user UUID
    private String userId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    
    private String razorpayOrderId;
	private String razorpayPaymentId;
	
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;   // CONFIRMED, CANCELLED, PENDING
    @Enumerated(EnumType.STRING)
     private PaymentStatus paymentStatus;
}
