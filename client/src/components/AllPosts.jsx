import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Postcard from "./Postcard";
import { Link } from "react-router-dom";
import LoggedOut from "./LoggedOut";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/post`, {
          withCredentials: true,
        });
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  const handleClick = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="bg-stone-100 flex flex-col items-center min-h-screen w-full px-4 pt-4">
      <nav className="border-white border-2 rounded-xl w-full h-20 flex justify-between items-center bg-zinc-400/50 pl-2">
        <div>
          <Link to={"/loggedin"}>
            <img
              className="h-16 rounded-full"
              src="/weblogo.png"
              alt="blog-logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between w-40">
          <Link to={"/create"}>
            <button className="border-zinc-600 border-2 rounded-3xl p-2 cursor-pointer text-black bg-zinc-100 hover:bg-zinc-600/50 hover:border-white hover:text-white transition-colors">
              Create
            </button>
          </Link>
           <div className="relative"> 
            <img
              onClick={handleClick}
              className="h-16 rounded-full"
              src="/user.png"
              alt="user"
            />

            {showDropdown && (
              <div className="text-center flex justify-center absolute right-0 top-full mt-2 w-[10rem] bg-white/30 rounded-2xl shadow-md z-50">
                <LoggedOut />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* p-4 ml-auto w-[10rem] text-center flex justify-end bg-black/10 rounded-2xl
      absolute right-0 top-full mt-2 w-[10rem] bg-black/10 rounded-2xl shadow-md z-50 */}

      <div className="mt-10">
        <p className="text-4xl text-zinc-500 font-mono font-semibold">
          Your Blogs
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 min-h-dvh p-5 mt-5">
        {isLoading ? (
          <p className="text-xl text-gray-600 col-span-full text-center">
            Loading Blogs..
          </p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Postcard key={post._id} post={post} onDelete={handleDeletePost} />
          ))
        ) : (
          <p className="text-xl text-gray-600 col-span-full text-center">
            Start Creating..
          </p>
        )}  
      </div>
    </div>
  );
};

export default AllPosts;
