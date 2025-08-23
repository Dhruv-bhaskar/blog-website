import React from 'react'

const DropDown = () => {
  return (
    <div className="flex flex-col gap-3 absolute top-2 right-0 border border-gray-500 bg-stone-100 dark:bg-gray-700 mr-4 p-5 rounded-xl">
          <a
            href="/login"
            className="px-4 py-2 border-b-2 border-gray-500 bg-gray-200 text-gray-700 hover:bg-gray-200 transition dark:border-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Log In
          </a>
          <a
            href="/register"
            className="px-4 py-2 border-b-2 border-gray-800 bg-blue-200 text-gray-800 hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
  )
}

export default DropDown