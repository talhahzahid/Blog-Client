import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Singleblog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
// fetch single user blog 
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/singleblog/${id}`
        );
        const data = await response.json();
        setBlog(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-min-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className="border border-gray-300 container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-3xl font-bold  text-gray-800 mb-4">{blog.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default Singleblog;
