import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleClick(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        data,
        { withCredentials: true }
      );
      navigate("/allpost");
      toast.success("Logged In");
    } catch (err) {
      console.error(err);
      if (err.response?.status == 400) {
        alert(err.response.data.message);
      } else {
        alert("login failed");
        console.error(err);
      }
    }
  }

  return (
    <div className="border flex flex-row justify-around items-center w-screen h-screen bg-orange-200">
      <form
        className="w-1/3 flex flex-col justify-center items-center mt-8"
        onSubmit={handleClick}
      >
        <div className="w-full h-96 flex flex-col justify-center items-center gap-8 border-orange-400 border-2 rounded-3xl bg-orange-300/35">
          <p className="text-orange-800 font-bold text-shadow-md text-[20px]">
            Login
          </p>
          <input
            className="border-orange-400 bg-orange-200 border-3 p-2 rounded-3xl w-[18rem] placeholder-orange-900 focus:outline-none"
            type="email"
            placeholder="enter email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            className="border-orange-400 bg-orange-200 border-3 p-2 rounded-3xl w-[18rem] placeholder-orange-900 focus:outline-none"
            type="password"
            placeholder="enter password"
            name="password"
            onChange={handleChange}
            required
          />
          <button className="border-orange-400/50 border-3 rounded-2xl w-25 h-10 bg-orange-200 text-red-800 hover:bg-orange-400 hover:text-white hover:border-white transition-colors">
            Login
          </button>
        </div>

        <p className="mt-8">
          Don't have account?{" "}
          <a className="text-blue-800" href="/register">
            Register
          </a>
        </p>
      </form>

      <div className="h-[45rem] w-[40rem] flex justify-center items-center p-3">
        <img
          className="h-full w-full rounded-3xl"
          src="/login.jpg"
          alt="login"
        />
      </div>
    </div>
  );
};

export default Login;
