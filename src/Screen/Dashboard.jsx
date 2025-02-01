import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [blog, setBlog] = useState("");
  const [refresh, setRefresh] = useState(false); // Add a refresh state

  const token = localStorage.getItem("Token");
  const handleDashborad = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(description);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/addblog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Blog Post Successfully", data);
      } else {
        setError(data.message || "Error Ocuured");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    setTitle("");
    setDescription("");
    setRefresh((prev) => !prev); // Toggle refresh state to trigger useEffect
  };
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
          console.log(data.all);
          setBlog(data.all);
        } else {
          setError(data.message || "Error Occurred");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
    userBlogFetch();
  }, [refresh]);
  return (
    <>
      <div className=" bg-[#020617]  text-[#2563eb]">
        <div className="flex justify-center items-center h-[70vh] ">
          <form
            onSubmit={handleDashborad}
            action=""
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
        {/* fetch user blog  */}
        <div className="p-4">
          {blog ? (
            <div className="grid grid-cols-1 gap-6 w-full">
              {blog.map((item) => (
                <div key={item._id} className="card bg-base-100 shadow-xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
                  <p className="text-gray-700 mb-6">{item.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="flex justify-center items-center h-screen">
              <span className="loading loading-spinner loading-lg"></span>
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
