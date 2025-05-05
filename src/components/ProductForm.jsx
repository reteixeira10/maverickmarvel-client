import React, { useState } from "react";

const ProductForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", material: "", weight: "" });
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
    formData.append("name", form.name);
    formData.append("material", form.material);
    formData.append("weight", form.weight);
    photos.forEach((file) => formData.append("photos", file));
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add product");
      }
      setForm({ name: "", material: "", weight: "" });
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
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 max-w-md"
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