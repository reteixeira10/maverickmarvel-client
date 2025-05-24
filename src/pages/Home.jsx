import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
        Welcome to MaverickMarvel
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl text-center">
        MaverickMarvel is a family-owned 3D printing farm dedicated to delivering high-quality prints and managing every aspect of your 3D printing business with ease. Explore products, filaments, suppliers, and more!
      </p>
    </div>
  );
};

export default Home;