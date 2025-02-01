import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Siginin = () => {
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("Token", data.accessToken);
        console.log("data", data);
        navigate("/dashboard");
      } else {
        setError(data.message || "Error Occurred");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] bg-[#020617]  ">
        <form
          onSubmit={handleSignIn}
          className="flex flex-col justify-center bg-[#f9fafb] gap-4 p-6 rounded-lg"
        >
          {error && (
            <h1 className="text-red-500 text-center font-bold">{error}</h1>
          )}

          <h1 className="text-center font-semibold text-xl">SignIn</h1>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="input input-ghost w-full max-w-xs "
            name="email"
            ref={email}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="input input-ghost w-full max-w-xs"
            ref={password}
          />
          <button type="submit" className="btn btn-primary">
            {loading ? (
              <span className="loading loading-bars loading-lg"></span>
            ) : (
              "SignIn"
            )}
          </button>
          <p className="text-center">
            New to Blogify?{" "}
            <span className="text-[#2563eb]">
              <Link>Join now</Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Siginin;
