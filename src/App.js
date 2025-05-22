import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductCreate from "./pages/ProductCreate";
import ProductEdit from "./pages/ProductEdit";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">
        <Navbar />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main className="flex-1 p-8 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/new" element={<ProductCreate />} />
              <Route path="/products/:id/edit" element={<ProductEdit />} />
              {/* Add more routes here for Filaments, Suppliers, etc. */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
