import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoggedOut from "./LoggedOut";

const PostDetails = () => {
  const [post, setPost] = useState("null");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
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

  if (!post) return <div>LOADING...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-2 bg-stone-50">
      <nav className="border-white border-2 rounded-xl w-full h-20 flex justify-between items-center bg-zinc-400 pl-2 pr-2 mr-2">
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
            <button className="border-zinc-600 border-2 rounded-3xl p-2 cursor-pointer text-black bg-zinc-100 hover:bg-zinc-600/50 hover:border-white hover:text-white transition-colors">
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
              <div className="text-center flex justify-center absolute right-0 top-full mt-2 w-[10rem] bg-white/30 rounded-2xl shadow-md z-50">
                <LoggedOut />
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-2 w-full">
        <div className="pl-4 pr-4 flex items-center justify-between h-[7rem] w-full mt-8">
          <h1 className="border-b rounded-md drop-shadow-sm drop-shadow-black p-4 text-4xl">
            {post.title}
          </h1>
          <div className="flex items-center justify-around h-full w-[10rem]">
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

        <div className="w-[95%] mx-auto text-gray-800 leading-relaxed text-lg">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
