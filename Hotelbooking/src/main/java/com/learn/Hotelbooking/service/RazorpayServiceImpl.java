package com.learn.Hotelbooking.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@Service
public class RazorpayServiceImpl implements RazorpayService {

	@Value("${razorpay.key}")
	private String keyId;
	
	@Value ("${razorpay.secret}")
	private String keySecret;
	
	
	@Override
	public Order createOrder(double totalPrice) throws RazorpayException {
	RazorpayClient client = new RazorpayClient(keyId,keySecret);
		
		JSONObject options = new JSONObject();
		options.put("amount", totalPrice * 100);
		options.put("currency", "INR");
		options.put("receipt", "enroll_"+System.currentTimeMillis());
		return client.orders.create(options);
	}


	@Override
	public Boolean verifyPayment(String orderId, String paymentId, String signature) throws RazorpayException {
		JSONObject options = new JSONObject();
		options.put("razorpay_order_id", orderId);
		options.put("razorpay_payment_id", paymentId);
		options.put("razorpay_signature", signature);
		
		try {
			Utils.verifyPaymentSignature(options, keySecret);
			return true;
		} catch (RazorpayException e) {
			System.err.println("Payment verification failed" + e.getMessage());
		}
		return false;
	}

	

}
