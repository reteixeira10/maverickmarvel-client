import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import './App.css';

function App() {
  return (
    <div className="App bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-56">
        <Navbar />
        {/* ...other components/pages... */}
      </div>
    </div>
  );
}

export default App;
