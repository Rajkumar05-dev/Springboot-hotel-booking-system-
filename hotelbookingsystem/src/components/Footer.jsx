import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-amber-600 text-black py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">Hotel Booking</h3>
          <p className="text-gray-200 text-sm">
            Your one-stop platform to discover, compare, and book the best hotels near you with ease.
          </p>
        </div>

     
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="text-gray-800 space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/hotels" className="hover:underline">Hotels</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul className="text-gray-200 space-y-2">
            <li>Luxury Rooms</li>
            <li>24/7 Service</li>
            <li>Free Wi-Fi</li>
            <li>Fine Dining</li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-xl font-bold mb-4">Connect with us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-gray-300"><Facebook /></a>
            <a href="#" className="hover:text-gray-300"><Twitter /></a>
            <a href="#" className="hover:text-gray-300"><Instagram /></a>
            <a href="#" className="hover:text-gray-300"><Mail /></a>
          </div>
          <p className="text-gray-200 text-sm">
            &copy; {new Date().getFullYear()} Hotel Booking. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
