import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../user/AuthContext";

function Navbar() {
  const { token, user, logOut } = useContext(authContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    logOut();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-amber-600 text-black p-5 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Hotel Booking</h1>

        <div className="font-bold text-md flex items-center space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {token ? (
            <>
              <Link to="/hotels" className="hover:underline">
                Hotels
              </Link>
              <Link to="/mybookings" className="hover:underline">
                My Bookings
              </Link>

              <span className="text-amber-300 font-medium">{user?.name}</span>

              <button className="hover:underline" onClick={logoutUser}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
