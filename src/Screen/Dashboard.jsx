import React, { useState } from "react";

const Dashboard = () => {
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleDashborad = async () => {
    console.log(title);
    console.log(Dashboard);
  };
  return (
    <>
      <div className=" bg-[#020617] h-[100vh] text-white">
        <div className="flex justify-center items-center h-[70vh] ">
          <form
            action=""
            className="flex flex-col justify-center bg-[#f9fafb] gap-4 p-6 rounded-lg w-full max-w-xs"
          >
            <input
              type="text"
              placeholder="Enter title"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => e.target.value}
              value={title}
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="What's on your mind"
              onChange={(e) => e.target.value}
              value={description}
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
