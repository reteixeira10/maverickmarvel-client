import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-green-700 dark:text-green-400 tracking-tight">
          Farm Ilusion
        </div>
        {/* <div className="space-x-6">
          <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 font-medium transition">
            Home
          </a>
          <a href="/products" className="text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 font-medium transition">
            Products
          </a>
          <a href="/about" className="text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 font-medium transition">
            About
          </a>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;