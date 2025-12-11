import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Rooms() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hotelId) return;

    fetch(`http://localhost:8080/rooms/hotel/${hotelId}`)
      .then((res) => res.json())
      .then((data) => setRooms(Array.isArray(data) ? data : []))
      .catch((err) => console.log("Error fetching rooms:", err));
  }, [hotelId]);

  const handleBook = (room) => {
    // Navigate to BookingForm and pass roomPrice via state
    navigate(`/bookings/${room.id}`, { state: { roomPrice: room.pricePerNight } });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 tracking-wide">
        Rooms in Hotel {hotelId}
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white p-5 shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&auto=format&fit=crop&q=60"
              alt={`Room ${room.roomNumber}`}
              className="h-44 w-full object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Room {room.roomNumber}
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Type:</span> {room.roomType}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Price:</span> ₹{room.pricePerNight}
            </p>
            <p className="text-gray-600 mb-3">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={
                  room.status === "AVAILABLE"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {room.status}
              </span>
            </p>

            {room.status === "AVAILABLE" && (
              <button
                onClick={() => handleBook(room)}
                className="bg-blue-600 text-white px-2 py-1 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 font-semibold"
              >
                Book Room
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
