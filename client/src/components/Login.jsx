import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleClick(e) {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        data,
        { withCredentials: true }
      );
      toast.success("Login successful");
      navigate("/loggedin");
      console.log(res.data);
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Login failed");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading)
    return (
      <div className="flex flex-col gap-4 w-full h-screen justify-center items-center dark:bg-black bg-gray-50">
        <img
          src="/weblogo.png"
          alt="logo"
          className="h-16 rounded-full animate-bounce"
        />
        <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">
          Logging you in...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-black/70 bg-gray-300 px-4">
      <div className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <img
            src="/weblogo.png"
            alt="logo"
            className="h-12 w-12 rounded-full"
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Login to continue 🚀
          </p>
        </div>

        <form onSubmit={handleClick} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 pr-12"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm font-medium text-blue-600 hover:underline focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
