import React, { useEffect, useState } from "react";

const placeholderImages = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
];

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-400">3D Printed Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, idx) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center"
          >
            <img
              src={placeholderImages[idx % placeholderImages.length]}
              alt={product.name}
              className="w-32 h-32 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{product.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-medium">Material:</span> {product.material}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-medium">Weight:</span> {product.weight} kg
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;