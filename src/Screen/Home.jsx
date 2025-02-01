import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for better user feedback

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/alluser");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlog(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "An error occurred while fetching blogs. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <div className="spinner">Loading...</div>{" "}
        {/* Optional: Add a spinner */}
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className=" bg-[#020617] text-[#2563eb]">
      <div className="min-h-screen  p-6 ">
        <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog.map((item) => {
            // Handle null or undefined userRef safely
            const userRef = item.userRef || {};
            const username = userRef.username || "Unknown User";
            const imageUrl = userRef.imageUrl || "/default-avatar.png";

            return (
              <div
                key={item._id}
                className="card bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-700">
                      {username}
                    </p>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{item.description}</p>
                <div className="mt-4 flex justify-end">
                  <p className="underline">
                    <Link to={`/singleblog/${item._id}`}>Read More</Link>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
