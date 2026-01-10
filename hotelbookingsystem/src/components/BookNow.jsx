import React, { useState } from "react";

const Book = ({ userId, roomId, checkInDate, checkOutDate, token }) => {
  const [loading, setLoading] = useState(false);

  const createBooking = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create Booking - POST request
      const bookingResponse = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }) // optional JWT
        },
        body: JSON.stringify({
          userId,
          roomId,
          checkInDate,
          checkOutDate,
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error("Booking request failed");
      }

      const booking = await bookingResponse.json();
      const { id: bookingId, totalPrice } = booking;

      // 2️⃣ Create Razorpay Order
      const orderResponse = await fetch(
        `http://localhost:8080/payments/create-order?amount=${totalPrice}`,
        {
          method: "POST",
          ...(token && { headers: { Authorization: `Bearer ${token}` } }) // optional JWT
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const orderData = await orderResponse.json();
      const { razorpayOrderId, amount, currency } = orderData;

      // 3️⃣ Razorpay payment options
      const options = {
        key: "rzp_test_S060WMnc2eFoWe", // Your Razorpay key
        amount,
        currency,
        name: "Hotelbooking",
        description: "Booking Payment",
        order_id: razorpayOrderId,
        handler: async function (response) {
          // 4️⃣ Confirm payment with backend
          const confirmResponse = await fetch(
            `http://localhost:8080/bookings/confirm-payment?bookingId=${bookingId}&razorpayOrderId=${response.razorpay_order_id}&razorpayPaymentId=${response.razorpay_payment_id}&razorpaySignature=${response.razorpay_signature}`,
            {
              method: "POST",
              ...(token && { headers: { Authorization: `Bearer ${token}` } }) // optional JWT
            }
          );

          if (!confirmResponse.ok) {
            throw new Error("Payment confirmation failed");
          }

          alert("Booking successful!");
        },
        theme: { color: "#2ecc71" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={createBooking}
      disabled={loading}
      className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Processing..." : "Book Now"}
    </button>
  );
};

export default BookNow;
