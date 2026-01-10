package com.learn.Hotelbooking.service;

import com.razorpay.Order;
import com.razorpay.RazorpayException;

public interface RazorpayService {
 Order createOrder(double totalPrice) throws RazorpayException;
  Boolean verifyPayment(String orderId, String paymentId, String signature) throws RazorpayException;
}
