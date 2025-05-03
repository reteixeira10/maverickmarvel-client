import React from "react";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Filaments", href: "/filaments" },
  { name: "Suppliers", href: "/suppliers" },
];

const Sidebar = () => {
  return (
    <aside className="h-screen w-56 bg-gray-100 dark:bg-gray-800 shadow-md flex flex-col py-8 px-4 fixed">
      {/* <div className="mb-10">
        <span className="text-2xl font-bold text-green-700 dark:text-green-400">Farm Ilusion</span>
      </div> */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 rounded px-3 py-2 font-medium transition"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;