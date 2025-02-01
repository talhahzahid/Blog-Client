import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      navigate("/signin");
      return;
    }
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/protected", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          //   localStorage.removeItem("Token");
          setIsAuthenticated(false);
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        // localStorage.removeItem("Token");
        setIsAuthenticated(false);
        navigate("/signin");
      }
    };
    verifyToken();
  }, []);

  return isAuthenticated ? (
    component
  ) : (
    <h1 className="flex justify-center items-center h-screen">
      <span className="loading loading-bars loading-lg"></span>
    </h1>
  );
};

export default ProtectedRoutes;
