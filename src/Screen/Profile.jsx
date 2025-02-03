import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultUser from "/public/default image.png";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = localStorage.getItem("id");
  const Token = localStorage.getItem("Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !Token) {
      setError("Missing user ID or access token.");
      setLoading(false);
      return;
    }
    // Fetch user profile data
    const handleProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/user/${id}`, {
          headers: { Authorization: `Bearer ${Token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.userData.imageUrl || defaultUser); // Show default image if none is provided
          setUsername(data.userData.username);
          setEmail(data.userData.email);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error fetching profile data.");
        }
      } catch (error) {
        setError("An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    handleProfile();
  }, [id, Token]);

  const UpdateProfile = async () => {
    setError(null);
    setSuccessMessage("");

    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/user/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error updating profile.");
      }
    } catch (error) {
      setError("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Update Profile
        </h1>

        {loading ? (
          <div className="flex justify-center mt-6">
            <div className="animate-spin rounded-full border-t-2 border-blue-500 w-16 h-16"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={imageUrl || defaultUser}
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Username and Email Input Fields */}
            <div className="space-y-4">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Type your username"
                className="input input-bordered w-full"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Type your email"
                className="input input-bordered w-full"
              />
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}

            {/* Update Button */}
            <div className="flex justify-center">
              <button
                onClick={UpdateProfile}
                className="btn btn-primary w-full mt-4"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
