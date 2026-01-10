package com.learn.Hotelbooking.service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.Hotelbooking.Dto.BookingDto;
import com.learn.Hotelbooking.Entities.Booking;
import com.learn.Hotelbooking.Entities.BookingStatus;
import com.learn.Hotelbooking.Entities.PaymentStatus;
import com.learn.Hotelbooking.Entities.Room;
import com.learn.Hotelbooking.repository.BookingRepository;
import com.learn.Hotelbooking.repository.RoomRepository;
import com.razorpay.RazorpayException;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RazorpayService razorpayService;

    @Override
    public BookingDto createBooking(BookingDto dto) {

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        long days = ChronoUnit.DAYS.between(
                dto.getCheckInDate(),
                dto.getCheckOutDate());

        if (days <= 0) {
            throw new RuntimeException("Invalid booking dates");
        }

        double totalPrice = room.getPricePerNight() * days;

        Booking booking = Booking.builder()
                .userId(dto.getUserId())
                .room(room)
                .checkInDate(dto.getCheckInDate())
                .checkOutDate(dto.getCheckOutDate())
                .totalPrice(totalPrice)
                .bookingStatus(BookingStatus.PENDING)   // ✅ FIX
                .paymentStatus(PaymentStatus.CREATED)   // ✅ FIX
                .build();

        bookingRepository.save(booking);
        return mapToDto(booking);
    }

    @Override
    public void ConfrimPayment(
            Long bookingId,
            String razorpayOrderId,
            String razorpayPaymentId,
            String razorpaySignature) throws RazorpayException {

        boolean isValid = razorpayService.verifyPayment(
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature);

        if (!isValid) {
            throw new RuntimeException("Payment verification failed");
        }

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setRazorpayOrderId(razorpayOrderId);
        booking.setRazorpayPaymentId(razorpayPaymentId);

        booking.setPaymentStatus(PaymentStatus.SUCCESS);   // ✅ FIX
        booking.setBookingStatus(BookingStatus.CONFIRMED); // ✅ FIX

        bookingRepository.save(booking);
    }

    @Override
    public List<BookingDto> getBookingsByUser(String userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private BookingDto mapToDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUserId());
        dto.setRoomId(booking.getRoom().getId());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setTotalPrice(booking.getTotalPrice());
        dto.setBookingStatus(booking.getBookingStatus()); // ✅ FIX
        return dto;
    }
}
