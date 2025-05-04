import React, { useEffect, useState } from "react";

const placeholderImages = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", material: "", weight: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          material: form.material,
          weight: parseFloat(form.weight)
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add product");
      }
      setForm({ name: "", material: "", weight: "" });
      fetchProducts();
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
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
        <form
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Product</h2>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-gray-200">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-gray-200">Material</label>
            <input
              type="text"
              name="material"
              value={form.material}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-gray-200">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              step="0.001"
              min="0"
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      )}
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