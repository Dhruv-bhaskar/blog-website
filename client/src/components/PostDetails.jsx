import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoggedOut from "./LoggedOut";

const PostDetails = () => {
  const [post, setPost] = useState("null");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [id]);

  async function handleDelete() {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/post/${id}`, {
        withCredentials: true,
      });
      toast.warn("Blog deleted");
      navigate("/allpost");
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
    <div className="flex flex-col items-center min-h-screen w-full p-2 bg-stone-50 dark:bg-zinc-900 transition-colors duration-300">
      <nav className="rounded-xl w-full h-20 flex justify-between items-center bg-zinc-400 pl-2 pr-2 mr-2 dark:bg-zinc-800">
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
              <div className="text-center flex justify-center absolute right-0 top-full mt-2 w-[10rem] bg-white/80 rounded-2xl shadow-md z-50 dark:bg-zinc-700">
                <LoggedOut />
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-2 w-full">
        <div className="pl-4 pr-4 flex flex-col sm:flex-row items-center justify-between min-h-[9rem] sm:h-[7rem] w-full mt-8">
          <h1 className="ml-4 border-b rounded-md p-4 text-md sm:text-3xl lg:text-4xl font-semibold dark:text-white">
            {post.title}
          </h1>
          <div className="flex items-center justify-around h-full w-[10rem] sm:mr-7">
            <Link
              to={`/edit/${post._id}`}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-full transition-colors text-sm font-semibold"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full transition-colors text-sm font-semibold"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="w-[95%] mt-3 mx-auto text-gray-800 leading-relaxed text-lg dark:text-gray-200">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
