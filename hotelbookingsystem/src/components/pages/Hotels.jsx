import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- add this

function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.log("Error fetching hotels", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-5">
        🏨 Available Hotels
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white p-4 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200"
          >
            <img
              src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac"
              alt={hotel.name}
              className="h-40 w-full object-cover rounded-md"
            />

            <h2 className="text-xl font-semibold mt-3">{hotel.name}</h2>

            <p className="mt-2 text-gray-700">{hotel.location}</p>
            <p className="mt-2 text-gray-700">{hotel.description}</p>
            

            <Link  className="bg-blue-600 text-white px-2 py-1  rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 font-semibold" to={`/rooms/${hotel.id}`}>View Rooms</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
