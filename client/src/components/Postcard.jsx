import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Postcard = ({ post, onDelete }) => {
  async function handleDelete() {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/post/${post._id}`, {
        withCredentials: true,
      });
      toast.warn("Blog deleted");

      if (onDelete) {
        onDelete(post._id); // Pass the ID of the deleted post back to the parent
      }
    } catch (err) {
      if (err.response?.status == 403) {
        alert(err.response.data.message);
      } else {
        alert("error in deleting");
        console.log(err);
      }
    }
  }

  return (
    <div className="border-stone-600 border-[3px] p-4 rounded-xl flex flex-col justify-between items-center w-[20rem] h-[28rem] overflow-hidden shadow-black/40 shadow-lg transition-shadow duration-300 hover:shadow-xl bg-stone-50 dark:bg-zinc-900 dark:border-zinc-700 dark:shadow-white/60">
      <div className="border-b border-gray-300 rounded-lg w-full flex flex-col justify-center items-center gap-2 pb-3 mb-2 dark:border-zinc-700">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Title</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{post.title.slice(0, 40)}...</h2>
      </div>

      <p className="flex-grow text-gray-700 text-base leading-relaxed overflow-hidden text-ellipsis max-h-[8rem] mb-4 dark:text-gray-300">
        {post.content.slice(0, 150)}...
      </p>

      <div className="flex justify-center gap-4 w-full mb-4">
        <Link
          to={`/edit/${post._id}`}
          className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-full transition-colors text-sm font-semibold dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-black"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full transition-colors text-sm font-semibold dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-black"
        >
          Delete
        </button>
      </div>

      <Link
        to={`/post/${post._id}`}
        className="bg-stone-600 text-white font-semibold p-2 rounded-full w-32 text-center text-sm hover:bg-stone-700 transition-colors dark:bg-stone-300 dark:text-black dark:hover:bg-white"
      >
        Read more
      </Link>
    </div>
  );
};

export default Postcard;
