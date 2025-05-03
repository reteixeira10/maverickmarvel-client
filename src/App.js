import React from "react";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <div className="App bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <Navbar />
      {/* ...other components... */}
    </div>
  );
}

export default App;
