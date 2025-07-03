import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const LoggedOut = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

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
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      toast.error("Error in logout");
    }
  }

  return (
    <div className="p-2 flex flex-col items-center w-30 gap-4 shadow-md">
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
