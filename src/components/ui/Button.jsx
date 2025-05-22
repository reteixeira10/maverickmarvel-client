import React from "react";
export function Button({ variant = "default", className = "", ...props }) {
  const base = "px-4 py-2 rounded font-semibold transition flex items-center";
  const variants = {
    default: "bg-green-700 text-white hover:bg-green-800",
    ghost: "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}