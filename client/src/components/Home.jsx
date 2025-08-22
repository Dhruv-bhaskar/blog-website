import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 dark:text-white flex flex-col">
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src="/weblogo.png"
            alt="logo"
            className="h-14 w-15 rounded-full"
          />
          <h1 className="text-2xl font-bold">Bloggish</h1>
        </div>
        <div className="flex gap-3">
          <a
            href="/login"
            className="px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Log In
          </a>
          <a
            href="/register"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center gap-4 text-center px-6 py-20 mt-[8rem]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Welcome to Bloggish
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8"
        >
          A place to create, grow, and share your ideas with the world.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a
            href="/register"
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Writing
          </a>
        </motion.div>
      </main>

      <section
        id="features"
        className="w-full max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center mt-[5rem]"
      >
        <div>
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Create and Manage
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            Easily create, edit, and manage your blog posts with a powerful
            editor.
          </p>
        </div>
        <img src="/typing.jpg" alt="create" className="rounded-2xl shadow-lg" />
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="/idea.jpg"
          alt="idea"
          className="rounded-2xl shadow-lg order-2 md:order-1"
        />
        <div className="order-1 md:order-2">
          <h3 className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-4">
            Share Your Ideas
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            Inspire others with your unique thoughts, projects, and learnings.
          </p>
        </div>
      </section>

      <section
        id="community"
        className="w-full max-w-7xl mx-auto px-6 py-20 text-center bg-gray-100 dark:bg-gray-700/30 rounded-3xl bg-[url('/worldmap.jpg')] bg-cover bg-center"
      >
        <h3 className="text-4xl font-bold mb-6 text-gray-800 text-shadow-md">
          Grow with People
        </h3>
        <p className="text-lg text-white font-semibold text-shadow-md text-shadow-black/80 mb-8">
          Join a vibrant community of writers and readers.
        </p>
        <a
          href="/register"
          className="px-8 py-3 rounded-2xl bg-green-600 text-white text-lg font-semibold hover:bg-green-700 transition"
        >
          Join Us
        </a>
      </section>

      <section
        id="contact"
        className=" w-full max-w-7xl mx-auto px-6 py-10 flex flex-col justify-center gap-6 items-center md:flex-row md:gap-[20rem] md:pl-[15rem]"
      >
        <div>
          <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
            Contact Us
          </h3>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li>
              <a
                href="https://www.linkedin.com/in/dhruv-kumar-4206b0274/"
                target="_blank"
                className="hover:underline"
              >
                LinkedIn - Dhruv Kumar
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Dhruv-bhaskar"
                target="_blank"
                className="hover:underline"
              >
                GitHub - Dhruv-bhaskar
              </a>
            </li>
          </ul>
        </div>
        <img
          src="/weblogo.png"
          alt="contact logo"
          className="h-40 w-40 rounded-full mx-auto"
        />
      </section>

      <footer className="w-full py-6 text-center border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
