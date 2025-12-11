import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../user/AuthContext";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const { token, user } = useContext(authContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const fetchBookings = () => {
    if (!user?.id || !token) return;
    setLoading(true);

    fetch(`http://localhost:8080/bookings/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // Fetch bookings when component mounts or user/token changes
  useEffect(() => {
    fetchBookings();
  }, [user?.id, token]);

  if (!user || !token) {
    return null; // optional: show loading or redirecting message
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold text-blue-600 mb-5">My Bookings</h1>

      {loading && <p className="text-gray-600">Loading bookings...</p>}

      <div className="space-y-4">
        {!loading && bookings.length === 0 && (
          <p className="text-gray-600">No bookings found.</p>
        )}

        {bookings.map((b) => (
          <div key={b.id} className="bg-white p-4 shadow rounded-lg">
            <p>
              <span className="font-medium">Hotel:</span>{" "}
              {b.room?.hotel?.name || b.room?.hotel?.id || "N/A"}
            </p>
            <p>
              <span className="font-medium">Room:</span>{" "}
              {b.room?.roomNumber || "N/A"}
            </p>
            <p>
              <span className="font-medium">Check-in:</span>{" "}
              {b.checkInDate || "N/A"}
            </p>
            <p>
              <span className="font-medium">Check-out:</span>{" "}
              {b.checkOutDate || "N/A"}
            </p>
            <p>
              <span className="font-medium">Total Price:</span> ₹
              {b.totalPrice || "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span> {b.status || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
