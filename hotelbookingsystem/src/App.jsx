import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Hotels from "./components/pages/Hotels";
import Footer from "./components/Footer";

import BookingForm from "./components/pages/Bookingform";
import MyBookings from "./components/pages/MyBookings";
import Rooms from "./components/pages/Rooms";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="/rooms/:hotelId" element={<Rooms />} />
        <Route path="bookings/:roomId" element={<BookingForm />} />

         <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
