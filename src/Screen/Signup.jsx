import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const imageUrl = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username.current.value);
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);
    formData.append("imageUrl", imageUrl.current.files[0]);

    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        navigate("/signin");
      } else {
        setError(data.message || "Error Occurred Check internet connect");
      }
    } catch (error) {
      setError("An error occurred. Check internet connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#020617]">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center bg-[#f9fafb] gap-4 p-6 rounded-lg"
      >
        {error && (
          <h1 className="text-red-500 text-center font-bold">{error}</h1>
        )}

        <h1 className="text-center font-semibold text-xl">SignUp</h1>

        <input
          type="text"
          placeholder="Enter Your Fullname"
          className="input input-ghost w-full max-w-xs"
          name="username"
          ref={username}
        />

        <input
          type="email"
          placeholder="Enter Your Email"
          className="input input-ghost w-full max-w-xs"
          name="email"
          ref={email}
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          className="input input-ghost w-full max-w-xs"
          ref={password}
        />

        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          ref={imageUrl}
        />

        <button type="submit" className="btn btn-primary">
          {loading ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : (
            "SignUp"
          )}
        </button>

        <p className="text-center">
          Already have an account?
          <span className="text-[#2563eb]">
            <Link to="/signin">Sign In</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
