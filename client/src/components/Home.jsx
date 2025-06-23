import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[url('/pencil.jpg')] bg-cover bg-center">
      <nav className="w-full max-w-7xl mx-auto rounded-xl mt-5 p-4 flex justify-between items-center bg-black/50 sticky top-5 z-50 h-20">
        <div>
          <Link to="/">
            <img
              className="h-16 w-auto rounded-full"
              src="/weblogo.png"
              alt="blog-logo"
            />
          </Link>
        </div>
        <div className="flex justify-end items-center gap-4 text-orange-500 text-lg w-auto">
          <Link
            to={"/login"}
            className="p-2 px-4 border-2 border-white rounded-3xl bg-orange-200 text-orange-700 font-semibold text-base hover:bg-orange-300 transition-colors"
          >
            Log In
          </Link>
          <Link
            to={"/register"}
            className="p-2 px-4 border-2 border-white rounded-3xl bg-orange-200 text-orange-700 font-semibold text-base hover:bg-orange-300 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <div className="pt-28 flex flex-col items-center gap-20 w-full flex-grow px-4">
        <div className="p-4 flex flex-col gap-5 justify-center items-center h-96 w-full max-w-4xl mx-auto text-center">
          <p className="text-7xl font-semibold text-amber-600/75">
            WELCOME TO BLOGGISH
          </p>
          <p className="text-gray-700/70 text-5xl">Your Blog Partner</p>
          <p className="text-gray-700/70 text-3xl">Create and Grow</p>
          <Link
            to={"/register"}
            className="bg-amber-200/50 border-amber-600 border-4 rounded-3xl p-2 px-8 text-amber-700 text-lg font-semibold hover:bg-amber-100 hover:text-gray-700 transition-colors"
          >
            Create
          </Link>
        </div>

        <div className="bg-white/30 rounded-3xl flex flex-col md:flex-row justify-center items-center w-full max-w-7xl mx-auto p-6 shadow-xl">
          <div className="p-4 flex flex-col gap-5 justify-center flex-1 text-center md:text-left">
            <p className="text-5xl text-blue-700/80 font-serif">
              Create and Manage your Blogs
            </p>
            <p className="text-3xl pl-0 md:pl-6 text-blue-900 font-mono">
              Create Edit and Delete your Blogs
            </p>
          </div>
          <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-12">
            <img
              className="h-64 md:h-60 rounded-2xl object-cover"
              src="/typing.jpg"
              alt="create"
            />
          </div>
        </div>

        <div className="bg-white/30 rounded-3xl flex flex-col md:flex-row-reverse justify-center items-center w-full max-w-7xl mx-auto p-6 shadow-xl">
          <div className="p-4 flex flex-col justify-center gap-5 flex-1 text-center md:text-right">
            <p className="text-5xl text-amber-700 font-serif">
              Project your great ideas and learnings in Blogs
            </p>
            <p className="text-3xl pl-0 md:pl-6 text-amber-800 font-mono">
              Learn Create and Grow
            </p>
          </div>
          <div className="flex-shrink-0 mt-6 md:mt-0 md:mr-12">
            <img
              className="h-64 md:h-60 rounded-2xl object-cover"
              src="/idea.jpg"
              alt="create"
            />
          </div>
        </div>

        <div className="rounded-3xl flex flex-col gap-7 items-center p-4 pt-15 w-full max-w-7xl mx-auto h-[30rem] bg-[url('/worldmap.jpg')] bg-cover bg-center">
          <p className="text-6xl text-stone-800 font-semibold text-shadow-white text-shadow-md text-center">Grow with People</p>
          <p className="text-2xl text-white font-bold font-serif text-shadow-black text-shadow-sm text-center">
            Many people are growing with us
          </p>
          <Link
            to={"/register"}
            className="border-green-600 border-4 rounded-3xl mt-7 p-2 px-8 bg-green-200/80 text-green-600 text-lg font-semibold hover:bg-green-300 transition-colors"
          >
            Join Us
          </Link>
        </div>

        <footer className="text-gray-200 bg-black/80 w-full py-8 flex flex-col md:flex-row justify-around items-center px-4 rounded-t-2xl">
          <div className="flex flex-col gap-5 mb-8 md:mb-0 md:w-1/3 text-center md:text-left">
            <div className="flex gap-3 items-center justify-center md:justify-start">
              <img
                className="h-7 w-7 rounded-full"
                src="/phone.webp"
                alt="contact"
              />
              <p className="text-white border-b-2 border-b-white pb-1">
                Contact Us
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-5 pl-0 items-center md:items-start">
              <div className="flex gap-3 items-center">
                <img
                  className="h-7 w-7 rounded-full"
                  src="/linkedin.svg"
                  alt="LinkedIn"
                />
                <p>Dhruv Kumar</p>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  className="h-7 w-7 rounded-full"
                  src="/github.svg"
                  alt="GitHub"
                />
                <p>Dhruv-bhaskar</p>
              </div>
            </div>
            <p className="mt-5 text-sm">
              © {new Date().getFullYear()} - Present Bloggish. All rights
              reserved.
            </p>
          </div>

          <div className="flex-shrink-0">
            <img
              className="h-40 w-40 rounded-full object-cover"
              src="/weblogo.png"
              alt="footer-logo"
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
