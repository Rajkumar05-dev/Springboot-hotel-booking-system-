import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState(() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(storedToken || null);

  const loginUser = (jwtToken, userDto) => {
    setToken(jwtToken);
    setUser(userDto);

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userDto));
  };

  const logOut = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
console.log("Hello");
  };

  return (
    <authContext.Provider value={{ token, user, loginUser, logOut }}>
      {children}
    </authContext.Provider>
  );
};
