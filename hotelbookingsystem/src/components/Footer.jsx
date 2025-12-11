import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-amber-600 text-black py-10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">Hotel Booking</h3>
          <p className="text-gray-900 text-sm leading-relaxed">
            Your one-stop platform to discover, compare, and book the best
            hotels near you with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:underline hover:text-white transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/hotels"
                className="hover:underline hover:text-white transition"
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:underline hover:text-white transition"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:underline hover:text-white transition"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-900">
            <li>Luxury Rooms</li>
            <li>24/7 Service</li>
            <li>Free Wi-Fi</li>
            <li>Fine Dining</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect with us</h3>
          <div className="flex space-x-5 mb-4">
            <a href="#" className="hover:text-white transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-white transition">
              <Twitter />
            </a>
            <a href="#" className="hover:text-white transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-white transition">
              <Mail />
            </a>
          </div>
          <p className="text-gray-900 text-sm">
            © {new Date().getFullYear()} Hotel Booking. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
