import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex">
        <Sidebar />
        <div className="flex-1 ml-56">
          <Navbar />
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Add more routes here for Products, Filaments, Suppliers, etc. */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
