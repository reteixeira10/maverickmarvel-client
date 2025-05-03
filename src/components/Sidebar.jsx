import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "Filaments", to: "/filaments" },
  { name: "Suppliers", to: "/suppliers" },
];

const Sidebar = () => {
  return (
    <aside className="h-screen w-56 bg-gray-100 dark:bg-gray-800 shadow-md flex flex-col py-8 px-4 fixed">
      <div className="mb-10">
        <span className="text-2xl font-bold text-green-700 dark:text-green-400">Farm Ilusion</span>
      </div>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 rounded px-3 py-2 font-medium transition ${
                isActive ? "bg-green-200 dark:bg-green-950 text-green-700 dark:text-green-400" : ""
              }`
            }
            end={item.to === "/"}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;