import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Token, setToken] = useState(localStorage.getItem("Token"));
  const [refresh, setRefresh] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsText, setCommentsText] = useState({});

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/alluser");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlog(data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("An error occurred while fetching blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [refresh]);

  // Handle Like
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
        setRefresh((prev) => !prev);
      } else {
        setError(data.message || "Something went wrong while liking the post");
      }
    } catch (error) {
      setError(error.message || "An error occurred while liking the post");
    }
  };

  // Handle Comment Change
  const handleCommentChange = (event, id) => {
    setCommentsText({
      ...commentsText,
      [id]: event.target.value,
    });
  };

  // Handle Comment Post
  const postComment = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: commentsText[id] }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCommentsText({ ...commentsText, [id]: "" });
      } else {
        setError(
          data.message || "Something went wrong while posting the comment"
        );
      }
    } catch (error) {
      setError(error.message || "An error occurred while posting the comment");
    }
  };

  // Fetch all comments for a blog
  const allUserComment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/getcomment/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.comments);
        setComments(data.comments);
      } else {
        setError(
          data.message || "Something went wrong while fetching comments"
        );
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching comments");
    }
  };

  // Loading State
  if (loading) {
    return (
      <h1 className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </h1>
    );
  }

  // Error State
  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // No Blogs Available
  if (!blog.length) {
    return <div className="text-center mt-10">No blogs available.</div>;
  }

  return (
    <div className="bg-[#020617] text-[#2563eb]">
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>
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
                    <SlLike className="inline" />
                    <span className="ml-2">{item.like.length}</span>
                  </h1>
                  <p className="underline">
                    <Link to={`/singleblog/${item._id}`}>Read More</Link>
                  </p>
                </div>

                {/* Comment Form */}
                <div className="max-w-xs w-full m-auto p-3">
                  <form
                    action=""
                    className="flex justify-center items-center space-x-3 w-full"
                    onSubmit={(e) => postComment(e, item._id)}
                  >
                    <input
                      type="text"
                      placeholder="Enter Comment"
                      value={commentsText[item._id] || ""}
                      onChange={(e) => handleCommentChange(e, item._id)}
                      className="input input-bordered w-full h-12 px-4 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary h-12 px-6 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                      Post
                    </button>
                  </form>

                  {/* Open Comments Modal */}
                  <button
                    className="btn btn-primary text-center w-full m-auto mt-3"
                    onClick={() => {
                      allUserComment(item._id); // Fetch comments for the blog
                      document.getElementById("my_modal_3").showModal(); // Show the modal
                    }}
                  >
                    Open Comments
                  </button>

                  {/* Modal Dialog */}
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg">Hello Readers</h3>
                      <div className="py-4">
                        {comments.length > 0 ? (
                          comments.map((item) => (
                            <div key={item._id} className="comment-item">
                              <div className="border border-black mt-2 p-2 flex gap-3">
                                <img
                                  src={item.userId.imageUrl}
                                  alt="User Avatar"
                                  className="w-10 rounded-lg"
                                />
                                <div>
                                  <h4 className="text-black">
                                    Author: {item.userId.username}
                                  </h4>
                                  <p>{item.comment}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <h1>No comments yet.</h1>
                        )}
                      </div>
                    </div>
                  </dialog>
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
