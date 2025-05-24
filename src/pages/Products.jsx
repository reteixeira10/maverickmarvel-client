import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";
import { Button } from "../components/ui/Button";
import { PlusCircle } from "lucide-react";
import { Package, Weight, Edit, Trash2 } from "lucide-react";

// REACT_APP_API_URL will be set by Render for the deployed static site
// For local development, if REACT_APP_API_URL is not set, it will default to an empty string,
// making the fetch relative ("/api/products"), which then gets handled by your local proxy.
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);

    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        // Handle error appropriately, e.g., set an error state
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
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
      {/* <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-400">
        3D Printed Products
      </h1> */}
      <Button
        onClick={() => navigate("/products/new")}
        className="mb-4 inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded transition"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        New Product
      </Button>
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-300 py-8">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col cursor-pointer transition hover:shadow-lg"
              onClick={() => setSelectedProductId(product.id)}
            >
              {product.photo ? (
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={product.photo.image}
                  alt={product.photo.filename}
                />
              ) : (
                <div className="rounded-t-lg w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-lg">
                  No Photo
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <div className="mb-3 flex items-center text-gray-700 dark:text-gray-400">
                  <Package className="w-5 h-5 mr-2" />
                  <span className="font-medium mr-1">Material:</span>
                  {product.material}
                </div>
                <div className="mb-3 flex items-center text-gray-700 dark:text-gray-400">
                  <Weight className="w-5 h-5 mr-2" />
                  <span className="font-medium mr-1">Weight:</span>
                  {product.weight} kg
                </div>
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product.id}/edit`);
                    }}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white 
    bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
    dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product.id);
                    }}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-700 transition"
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ProductModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />
    </div>
  );
};

export default Products;