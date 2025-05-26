import React, { useState } from "react";

// REACT_APP_API_URL will be set by Render for the deployed static site
// For local development, if REACT_APP_API_URL is not set, it will default to an empty string,
// making the fetch relative ("/api/products"), which then gets handled by your local proxy.
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const ProductForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    material: "",
    weight: "",
    SKU: "",
    cost: "",
    orders: "",
    origin: "",
    print_time: "",
    category: "",
    dimensions: "",
    colors: "",
    print_instruction: "",
    copywriting: "",
    marketplace: "",
    active: false,
  });
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotosChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    photos.forEach((file) => formData.append("photos", file));
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add product");
      }
      setForm({
        name: "",
        material: "",
        weight: "",
        SKU: "",
        cost: "",
        orders: "",
        origin: "",
        print_time: "",
        category: "",
        dimensions: "",
        colors: "",
        print_instruction: "",
        copywriting: "",
        marketplace: "",
        active: false,
      });
      setPhotos([]);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
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
          required
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Material</label>
        <input
          type="text"
          name="material"
          value={form.material}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          required
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">SKU</label>
        <input
          type="text"
          name="SKU"
          value={form.SKU}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Cost</label>
        <input
          type="number"
          name="cost"
          value={form.cost}
          onChange={handleChange}
          step="0.01"
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Orders</label>
        <input
          type="number"
          name="orders"
          value={form.orders}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Origin</label>
        <input
          type="url"
          name="origin"
          value={form.origin}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Print Time</label>
        <input
          type="text"
          name="print_time"
          value={form.print_time}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Dimensions</label>
        <input
          type="text"
          name="dimensions"
          value={form.dimensions}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Colors</label>
        <input
          type="text"
          name="colors"
          value={form.colors}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Print Instruction</label>
        <textarea
          name="print_instruction"
          value={form.print_instruction}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Copywriting</label>
        <textarea
          name="copywriting"
          value={form.copywriting}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Marketplace</label>
        <textarea
          name="marketplace"
          value={form.marketplace}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Active</label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="mr-2"
          />
          Active
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Photos</label>
        <input
          type="file"
          name="photos"
          multiple
          accept="image/*"
          onChange={handlePhotosChange}
          className="block w-full text-gray-900 dark:text-gray-100"
        />
        {photos.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {photos.map((file, idx) => (
              <span key={idx} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {file.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;