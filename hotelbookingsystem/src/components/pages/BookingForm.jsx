import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { authContext } from "../../user/AuthContext";

function BookingForm() {
  const { token, user } = useContext(authContext);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, watch, setValue } = useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Room price passed from Rooms.jsx
  const roomPrice = location.state?.roomPrice || 0;

  // Redirect if not logged in
  const localUser = JSON.parse(localStorage.getItem("user"));
  if (!localUser) {
    alert("Login First");
    navigate("/login");
    return null;
  }

  // Today date
  const today = new Date().toISOString().split("T")[0];

  // Watch dates
  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");

  // Default check-in date
  useEffect(() => {
    setValue("checkInDate", today);
  }, [setValue, today]);

  // Calculate total price
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        const price = diffDays * roomPrice;
        setTotalPrice(price);
        setValue("totalPrice", price);
      } else {
        setTotalPrice(0);
        setValue("totalPrice", 0);
      }
    }
  }, [checkInDate, checkOutDate, roomPrice, setValue]);

  // Submit + Payment
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 1️⃣ Create Booking
      const bookingResponse = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId,
          userId: user.id,
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          totalPrice: totalPrice,
          status: "PENDING",
        }),
      });

      if (!bookingResponse.ok) throw new Error("Booking failed");

      const booking = await bookingResponse.json();
      const bookingId = booking.id;

      // 2️⃣ Create Razorpay Order
      const orderResponse = await fetch(
        `http://localhost:8080/payments/create-order?amount=${totalPrice}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!orderResponse.ok) throw new Error("Order creation failed");

      const orderData = await orderResponse.json();

      // 3️⃣ Razorpay Payment
      const options = {
        key: "rzp_test_S060WMnc2eFoWe",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Hotel Booking",
        description: "Room Booking Payment",
        order_id: orderData.razorpayOrderId,

        handler: async function (response) {
          // 4️⃣ Confirm Payment
          await fetch(
            `http://localhost:8080/bookings/confirm-payment?bookingId=${bookingId}&razorpayOrderId=${response.razorpay_order_id}&razorpayPaymentId=${response.razorpay_payment_id}&razorpaySignature=${response.razorpay_signature}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert("Payment Successful 🎉");
          navigate("/mybookings");
        },

        theme: { color: "#2563eb" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Book Room
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Check-in */}
          <div>
            <label className="block mb-1 font-medium">Check-in Date</label>
            <input
              type="date"
              className="w-full border px-4 py-2 rounded"
              {...register("checkInDate")}
              min={today}
              required
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="block mb-1 font-medium">Check-out Date</label>
            <input
              type="date"
              className="w-full border px-4 py-2 rounded"
              {...register("checkOutDate")}
              min={checkInDate || today}
              required
            />
          </div>

          {/* Total Price */}
          <div>
            <label className="block mb-1 font-medium">Total Price</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded bg-gray-100"
              value={totalPrice}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={loading || totalPrice === 0}
            className={`w-full text-white py-2 rounded font-medium ${
              loading || totalPrice === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Book & Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
