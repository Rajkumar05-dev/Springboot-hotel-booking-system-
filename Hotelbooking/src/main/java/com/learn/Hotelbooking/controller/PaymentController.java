package com.learn.Hotelbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.learn.Hotelbooking.service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    // 1️⃣ Create Razorpay Order
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestParam double amount) throws RazorpayException {

        Order order = razorpayService.createOrder(amount);

        return ResponseEntity.ok(order.toString());
    }
}
