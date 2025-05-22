import React from "react";
import { Home, Box, Layers, Truck } from "lucide-react";
import { Button } from "./ui/Button";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    { to: "/products", label: "Products", icon: <Box className="mr-2 h-4 w-4" /> },
    { to: "/filaments", label: "Filaments", icon: <Layers className="mr-2 h-4 w-4" /> },
    { to: "/suppliers", label: "Suppliers", icon: <Truck className="mr-2 h-4 w-4" /> },
  ];
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm p-4 min-h-screen">
      <nav className="space-y-1">
        {navItems.map(item => (
          <Link key={item.to} to={item.to}>
            <Button
              variant={location.pathname === item.to ? "default" : "ghost"}
              className="w-full justify-start mb-1"
            >
              {item.icon}
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}