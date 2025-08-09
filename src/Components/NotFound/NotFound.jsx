import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-500">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-4">
        Oops! Page not found
      </p>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.  
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
      >
        Go Home
      </Link>
    </div>
  );
}
