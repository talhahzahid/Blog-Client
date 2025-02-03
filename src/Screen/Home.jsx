import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlLike } from "react-icons/sl";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Token, setToken] = useState(localStorage.getItem("Token"));
  const [like, setLike] = useState("");
  const [liked, setLiked] = useState("");
  const [refresh, setRefresh] = useState(""); // state for like then update
  const [data, setData] = useState(); // for datastate
  // Fetch all blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/alluser");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlog(data.data);
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [refresh]);
  // console.log("data data" , data)
  const userLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/like/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Like updated", data);
        setLike(data.message);
        setRefresh(data);
        setBlog((prevBlogs) =>
          prevBlogs.map((item) =>
            item._id === id ? { ...item, liked: !item.liked } : item
          )
        );
      } else {
        setError(data.message || "Something went wrong");
        // setLike(data.message)
      }
    } catch (error) {
      setError(error.message || "An error occurred while liking the post");
    }
  };
  // console.log(data)
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        setLike(data.message);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  // Loading state
  if (loading) {
    return (
      <h1 className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </h1>
    );
  }

  // Error state
  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!blog.length) {
    return <div className="text-center mt-10">No blogs available.</div>;
  }

  return (
    <div className="bg-[#020617] text-[#2563eb]">
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>
        {like && <h1 className="text-center text-xl">{like}</h1>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog.map((item) => {
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
                <div className="mt-4 flex justify-between">
                  <h1
                    className="text-xl cursor-pointer"
                    onClick={() => userLike(item._id)}
                  >
                    <SlLike />
                    <span className="ml-2">{item.like.length}</span> <br />
                  </h1>
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
