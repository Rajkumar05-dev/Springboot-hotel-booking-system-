import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../user/AuthContext";
import { Menu, X } from "lucide-react"; // for hamburger icons

function Navbar() {
  const { token, user, logOut } = useContext(authContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const logoutUser = () => {
    logOut();
    navigate("/login");
  };

  return (
    <nav className="bg-amber-600 text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <h1 className="font-bold text-xl">Hotel Booking</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-md font-semibold items-center">
            <Link to="/" className="hover:underline">Home</Link>

            {token ? (
              <>
                <Link to="/hotels" className="hover:underline">Hotels</Link>
                <Link to="/mybookings" className="hover:underline">
                  My Bookings
                </Link>

                <span className="text-amber-300">{user?.name}</span>

                <button onClick={logoutUser} className="hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="hover:underline">Register</Link>
                <Link to="/login" className="hover:underline">Login</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            {isOpen ? (
              <X size={28} onClick={() => setIsOpen(false)} className="cursor-pointer" />
            ) : (
              <Menu size={28} onClick={() => setIsOpen(true)} className="cursor-pointer" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-amber-500 px-4 py-4 space-y-3 font-semibold">
          <Link className="block" to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          {token ? (
            <>
              <Link className="block" to="/hotels" onClick={() => setIsOpen(false)}>
                Hotels
              </Link>

              <Link className="block" to="/mybookings" onClick={() => setIsOpen(false)}>
                My Bookings
              </Link>

              <div className="text-amber-200">{user?.name}</div>

              <button
                className="block w-full text-left"
                onClick={() => {
                  logoutUser();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="block" to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
              <Link className="block" to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
