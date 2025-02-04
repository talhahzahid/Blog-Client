import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("Token");

  // Add blog functionality
  const handleDashboard = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/addblog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Blog Post Successfully", data);
        setTitle("");
        setDescription("");
        setRefresh((prev) => !prev);
      } else {
        setError(data.message || "Error Occurred");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all user blogs on page load or after refresh
  useEffect(() => {
    const userBlogFetch = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setBlog(data.all || []);
        } else {
          setError(data.message || "Error Occurred");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
    userBlogFetch();
  }, [refresh]);

  // Delete blog functionality
  const deleteBlog = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);
        setRefresh((prev) => !prev); // Refresh the blog list after deletion
      } else {
        console.log("Error:", data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Update blog functionality (same logic, but you can set fields to edit)
  const updateBlog = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/edit/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Blog updated:", data);
        setRefresh((prev) => !prev);
      } else {
        console.log("Error:", data);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-[#2563eb]">
      <div className="flex justify-center items-center h-[70vh]">
        <form
          onSubmit={handleDashboard}
          className="flex flex-col justify-center bg-[#f9fafb] gap-4 p-6 rounded-lg w-full max-w-xs"
        >
          {error && (
            <h1 className="text-red-500 text-center font-bold">{error}</h1>
          )}
          <h1 className="text-xl font-semibold">Blogify</h1>
          <input
            type="text"
            placeholder="Enter title"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="textarea textarea-bordered"
            placeholder="What's on your mind"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <button type="submit" className="btn btn-primary">
            {loading ? (
              <span className="loading loading-bars loading-lg"></span>
            ) : (
              "Publish"
            )}
          </button>
        </form>
      </div>

      {/* Display Blogs */}
      <div className="p-4">
        {blog.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 w-full">
            {blog.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
                <p className="text-gray-700 mb-6">{item.description}</p>
                <div className="flex justify-end gap-3">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setTitle(item.title); // Pre-fill the fields for editing
                      setDescription(item.description);
                      updateBlog(item._id);
                    }}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => deleteBlog(item._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="flex justify-center items-center text-white text-3xl ">
            {/* <span className="loading loading-spinner loading-lg"></span> */}
            No Blog Post
          </h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
