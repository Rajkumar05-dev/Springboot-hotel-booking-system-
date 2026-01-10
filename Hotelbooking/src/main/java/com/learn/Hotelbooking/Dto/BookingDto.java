package com.learn.Hotelbooking.Dto;

import java.time.LocalDate;

import com.learn.Hotelbooking.Entities.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {

    private Long id;
    private String userId;
    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Double totalPrice;
    private BookingStatus bookingStatus;
}

