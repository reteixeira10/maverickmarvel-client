import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="px-4 py-3 flex items-center">
        <img src="/logo.png" alt="MaverickMarvel Logo" className="h-8 w-8 mr-3 rounded" />
        <span className="text-xl font-bold text-gray-800 dark:text-green-400">MaverickMarvel</span>
      </div>
    </header>
  );
}