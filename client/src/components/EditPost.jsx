import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoggedOut from "./LoggedOut";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/post/${id}`,
        { title, content },
        { withCredentials: true }
      );
      toast.info("Blog updated");
      navigate(`/post/${id}`);
    } catch (err) {
      if (err.response?.status == 403) {
        alert(err.response.data.message);
      }
      console.log(err);
      alert("error in deleting");
    }
  }

  const handleClick = () => {
    setShowDropdown((prev) => !prev);
  };
 
  if (isLoading)
    return (
      <div className="flex flex-col gap-2 w-full h-screen justify-center items-center dark:bg-zinc-900">
        <img
          src="/weblogo.png"
          alt="logo"
          className="h-16 rounded-full animate-bounce"
        />
        <p className="text-xl text-gray-600 text-center dark:text-white">
          Loading..
        </p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-blue-50 dark:bg-zinc-900 transition-colors duration-300">
      <nav className="rounded-xl w-full h-20 flex justify-between items-center bg-zinc-400 pl-4 pr-2 mr-2 dark:bg-zinc-800">
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

      <h2 className="text-2xl text-blue-700/60 mt-8 border-b border-blue-700 text-shadow-md rounded-lg pb-2 dark:text-blue-300 dark:border-blue-300">
        Edit Blog
      </h2>

      <form
        className="flex flex-col items-center gap-6 mt-8 p-3 w-full max-w-5xl"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-stone-50 border-blue-200 border-3 rounded-2xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 dark:border-blue-400"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="bg-stone-50 border-blue-200 border-3 w-full rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 dark:border-blue-400"
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-stone-50 border-blue-300 border-3 rounded-full p-2 text-lg text-blue-800 font-semibold hover:bg-blue-600 hover:text-white transition-colors dark:bg-zinc-700 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500 dark:hover:text-black"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
