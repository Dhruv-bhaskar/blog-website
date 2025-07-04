import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LoggedOut from "./LoggedOut";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/post`,
        { title, content },
        { withCredentials: true }
      );
      toast.success("Blog created");
      console.log(res);
      navigate("/allpost");
    } catch (err) {
      if (err.response?.status == 400) {
        alert(err.response.data.message);
      } else {
        alert("Blog creation failed");
      }
      console.error(err);
    }
  }

  const handleClick = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen w-screen dark:bg-zinc-900 transition-colors duration-300">
      <nav className="rounded-xl w-full h-20 flex justify-between items-center bg-zinc-400 px-4 dark:bg-zinc-800">
        <div>
          <Link to={"/loggedin"}>
            <img
              className="h-16 rounded-full"
              src="/weblogo.png"
              alt="blog-logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between w-45">
          <Link to={"/allpost"}>
            <button className="border-zinc-600 border-2 rounded-3xl p-2 cursor-pointer text-black bg-zinc-100 hover:bg-zinc-600/50 hover:border-white hover:text-white transition-colors dark:bg-zinc-700 dark:text-white dark:border-zinc-500 dark:hover:bg-zinc-600">
              Dashboard
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
              <div className="text-center flex justify-center absolute right-0 top-full mt-2 w-[10rem] bg-white/30 rounded-2xl shadow-md z-50 dark:bg-zinc-700">
                <LoggedOut />
              </div>
            )}
          </div>
        </div>
      </nav>

      <form
        className="w-full max-w-7xl mx-auto p-4 flex flex-col items-center gap-8 mt-[1rem]"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl text-shadow-md border-b rounded-lg pb-2 font-semibold text-[#754444] dark:text-[#f4bcbc]">Create Blog</p>
        <input
          className="border-[#754444] bg-[#f7eaea5f] border-2 rounded-2xl p-2 w-full placeholder-slate-700 text-[#421b1b] dark:placeholder-gray-400 dark:text-white"
          type="text"
          placeholder="enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border-[#754444] border-2 bg-[#f7eaea5f] rounded-2xl p-2 w-full placeholder-slate-700 text-[#421b1b] dark:bg-[#3c3c3c] dark:placeholder-gray-400 dark:text-white"
          rows={15}
          value={content}
          placeholder="write content"
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button
          className="cursor-pointer border-[#754444] border-2 font-semibold text-lg text-[#2c0f0f] rounded-3xl w-full p-2 hover:bg-[#754444] hover:text-white transition-colors dark:border-[#f4bcbc] dark:text-white dark:hover:bg-[#f4bcbc] dark:hover:text-black"
          type="submit"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
