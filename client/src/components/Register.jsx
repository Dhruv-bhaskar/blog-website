import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleClick(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        data,
        { withCredentials: true }
      );
      toast.success("User registered");
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      if (err.response?.status == 400) {
        alert(err.response.data.message);
      } else {
        alert("Registration failed");
      }
      console.error(err);
    }
  }

  return (
    <div className="border flex flex-row justify-around items-center w-screen h-screen bg-orange-200">
      <form
        className="w-1/3 flex flex-col justify-center items-center mt-8"
        onSubmit={handleClick}
      >
        <div className="w-full h-[28rem] flex flex-col justify-center items-center gap-8 border-blue-400 border-2 rounded-3xl bg-blue-200/30">
          <p className="text-blue-950 font-bold text-shadow-md text-[20px]">
            Register
          </p>
          <input
            className="border-blue-400 border-3 p-2 rounded-3xl w-[18rem] placeholder-blue-900 focus:outline-none"
            type="text"
            placeholder="enter username"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            className="border-blue-400 border-3 p-2 rounded-3xl w-[18rem] placeholder-blue-900 focus:outline-none"
            type="email"
            placeholder="enter email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            className="border-blue-400 border-3 p-2 rounded-3xl w-[18rem] placeholder-blue-900 focus:outline-none"
            type="password"
            placeholder="enter password"
            name="password"
            onChange={handleChange}
            required
          />
          <button className="border-blue-400/50 border-3 rounded-2xl w-25 h-10 bg-blue-200 text-violet-800 hover:bg-blue-500 hover:border-white hover:text-white transition-colors">
            Register
          </button>
        </div>

        <p className="mt-8">
          Alredy have account?{" "}
          <a className="text-blue-800" href="/login">
            Login
          </a>
        </p>
      </form>

      <div className="h-[45rem] w-[40rem] flex justify-center items-center p-3">
        <img
          className="h-full w-full rounded-3xl"
          src="/register.jpg"
          alt="register"
        />
      </div>
    </div>
  );
};

export default Register;
