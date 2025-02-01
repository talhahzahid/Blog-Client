import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/logout", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
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

  return (
    <>
      <div className="navbar bg-base-100">
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
                <span>
                  <Link to="/">Home</Link>
                </span>
              </li>
              <li>
                <span>
                  <Link to="/dashboard">Dashboard</Link>
                </span>
              </li>
              <li>
                <h1 onClick={handleLogout}>Logout</h1>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <span>
                <Link to="/">Home</Link>
              </span>
            </li>
            <li>
              <span>
                <Link to="/dashboard">Dashboard</Link>
              </span>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-error" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
