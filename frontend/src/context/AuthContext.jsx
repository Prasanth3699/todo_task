/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your application
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Function to check if user is authenticated (e.g., using token)
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth",

            {
              headers: {
                "x-auth-token": token,
              },
            }
          );

          setUser(response.data.user); // Set user data if token is valid
        } catch (error) {
          console.error("Error checking authentication:", error);
          logout(); // Logout user if token is invalid
        }
      }
      setLoading(false); // Update loading state
    };

    checkAuth();
  }, [user]);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      console.log(jwtDecode(response.data.token).user);
      setUser(jwtDecode(response.data.token).user.id); // Set user data
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Reset user state
  };

  // Context value
  const authContextValue = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children} {/* Render children once loading is complete */}
    </AuthContext.Provider>
  );
};
