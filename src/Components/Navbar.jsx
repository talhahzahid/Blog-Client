import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import defaultUser from "/public/default image.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [authChange, setAuthChange] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("Token");
        localStorage.removeItem("id");
        navigate("/signin");
        setImageUrl(null);
        setAuthChange((prev) => !prev);
        console.log("Logout Successfully");
      } else {
        console.error("Error logging out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const Token = localStorage.getItem("Token");
    const id = localStorage.getItem("id");

    if (!Token || !id) {
      setImageUrl(null);
      return;
    }

    const handleProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/user/${id}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.userData.imageUrl);
        } else {
          console.log("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    handleProfile();
  }, [authChange]);

  return (
    <div className="navbar bg-base-100 shadow-lg">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button className="w-full text-left" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" to="/">
          Blogify
        </Link>
      </div>
      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Link to="/profile">
              <img
                src={imageUrl || defaultUser}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            </Link>
          </div>
        </div>
        <a
          className="cursor-pointer text-2xl text-red-400 hover:text-red-500 transition duration-300"
          onClick={handleLogout}
        >
          <MdLogout />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
