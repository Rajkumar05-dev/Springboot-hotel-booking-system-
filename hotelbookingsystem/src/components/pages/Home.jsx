import React from "react";
import { Link } from "react-router-dom";
import { Hotel, Bell, Wifi, Coffee } from "lucide-react";

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501117716987-c8e5a26e4e26?w=1600&auto=format&fit=crop&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-30 min-h-screen">
        <div className="relative w-half h-96 mb-12 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1728513012012-173a4cd9c05f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBpbWFnZXMlMjBob3RlbHMlMjBnaXZlcyUyMGdvb2RzJTIwdmliZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Hotel Hero"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to Hotel Booking
            </h1>
            <p className="text-lg max-w-lg mb-6">
              Discover the best hotels near you. Browse, compare, and book your
              stay with ease.
            </p>
            <Link
              to="/hotels"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 font-semibold"
            >
              Show Hotels
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mb-12 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-200">
            <Hotel className="mx-auto text-4xl text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Luxury Rooms</h3>
            <p className="text-gray-600 text-sm">
              Comfortable rooms with premium amenities.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-200">
            <Bell className="mx-auto text-4xl text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">24/7 Service</h3>
            <p className="text-gray-600 text-sm">
              Our staff is always ready to assist you.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-200">
            <Wifi className="mx-auto text-4xl text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Free Wi-Fi</h3>
            <p className="text-gray-600 text-sm">
              Stay connected anywhere in the hotel.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-200">
            <Coffee className="mx-auto text-4xl text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Fine Dining</h3>
            <p className="text-gray-600 text-sm">
              Delicious meals prepared by top chefs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
