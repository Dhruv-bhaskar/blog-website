import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const LoggedOut = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
          withCredentials: true,
        });
        setUser(res.data.username);
        console.log(res.data);
        
      } catch (err) {
        console.error("failed to fetch user details", err);
      }
    };

    fetchUser()
  }, []);

  async function handleLogout() {
    setIsLoading(true)
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      toast.error("Error in logout");
    }finally{
      setIsLoading(false)
    }
  }

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 w-full h-[5rem] justify-center items-center dark:bg-zinc-900">
        <img
          src="/weblogo.png"
          alt="logo"
          className="h-12 rounded-full animate-bounce"
        />
        <p className="text-lg text-gray-600 text-center dark:text-white">
          Logging Out..
        </p>
      </div>
    );

  return (
    <div className="p-2 flex flex-col items-center w-30 gap-4">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Hi, {user}</p>
      <button
        onClick={handleLogout}
        className="cursor-pointer border border-gray-700 dark:border-gray-300 w-24 rounded-full text-sm py-1.5 px-4 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default LoggedOut;
