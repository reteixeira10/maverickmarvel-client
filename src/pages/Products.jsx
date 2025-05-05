import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete product");
      }
      fetchProducts();
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-400">3D Printed Products</h1>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded transition"
      >
        {showForm ? "Cancel" : "Add New Product"}
      </button>
      {showForm && (
        <ProductForm
          onSuccess={() => {
            fetchProducts();
            setShowForm(false);
          }}
        />
      )}
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-300 py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              {product.photo ? (
                <img
                  src={product.photo.image}
                  alt={product.photo.filename}
                  className="w-32 h-32 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 flex items-center justify-center text-gray-400">
                  No Photo
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{product.name}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <span className="font-medium">Material:</span> {product.material}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <span className="font-medium">Weight:</span> {product.weight} kg
              </p>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;