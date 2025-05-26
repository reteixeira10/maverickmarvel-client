import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// REACT_APP_API_URL will be set by Render for the deployed static site
// For local development, if REACT_APP_API_URL is not set, it will default to an empty string,
// making the fetch relative ("/api/products"), which then gets handled by your local proxy.
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    SKU: "",
    category: "",
    material: "",
    colors: "",
    dimensions: "",
    weight: "",
    cost: "",
    orders: "",
    origin: "",
    print_time: "",
    print_instruction: "",
    copywriting: "",
    marketplace: "",
    active: true,
  });
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name || "",
          SKU: data.SKU || "",
          category: data.category || "",
          material: data.material || "",
          colors: data.colors || "",
          dimensions: data.dimensions || "",
          weight: data.weight ?? "",
          cost: data.cost ?? "",
          orders: data.orders ?? "",
          origin: data.origin || "",
          print_time: data.print_time || "",
          print_instruction: data.print_instruction || "",
          copywriting: data.copywriting || "",
          marketplace: data.marketplace || "",
          active: !!data.active,
        });
        setExistingPhotos(data.photos || []);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotosChange = e => {
    const files = Array.from(e.target.files);
    setPhotos(files);

    // Generate previews
    const previews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews(previews);
  };

  const handleRemovePhoto = photoId => setExistingPhotos(existingPhotos.filter(p => p.id !== photoId));
  const handleRemoveNewPhoto = idx => {
    setPhotos(photos.filter((_, i) => i !== idx));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== idx));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("SKU", form.SKU);
    formData.append("category", form.category);
    formData.append("material", form.material);
    formData.append("colors", form.colors);
    formData.append("dimensions", form.dimensions);
    formData.append("weight", form.weight);
    formData.append("cost", form.cost);
    formData.append("orders", form.orders);
    formData.append("origin", form.origin);
    formData.append("print_time", form.print_time);
    formData.append("print_instruction", form.print_instruction);
    formData.append("copywriting", form.copywriting);
    formData.append("marketplace", form.marketplace);
    formData.append("active", form.active);
    existingPhotos.forEach(photo => formData.append("keepPhotos", photo.id));
    photos.forEach(file => formData.append("photos", file));
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update product");
      }
      navigate("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-400">Edit Product</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">SKU</label>
          <input
            name="SKU"
            value={form.SKU}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Material</label>
          <input
            name="material"
            value={form.material}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Colors</label>
          <input
            name="colors"
            value={form.colors}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Dimensions</label>
          <input
            name="dimensions"
            value={form.dimensions}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Weight (kg)</label>
          <input
            name="weight"
            value={form.weight}
            onChange={handleChange}
            type="number"
            step="0.001"
            min="0"
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Cost</label>
          <input
            name="cost"
            value={form.cost}
            onChange={handleChange}
            type="number"
            step="0.01"
            min="0"
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Orders</label>
          <input
            name="orders"
            value={form.orders}
            onChange={handleChange}
            type="number"
            min="0"
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Origin</label>
          <input
            name="origin"
            value={form.origin}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Print Time</label>
          <input
            name="print_time"
            value={form.print_time}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Print Instruction</label>
          <textarea
            name="print_instruction"
            value={form.print_instruction}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Copywriting</label>
          <textarea
            name="copywriting"
            value={form.copywriting}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Marketplace</label>
          <input
            name="marketplace"
            value={form.marketplace}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Active</label>
          <input
            name="active"
            type="checkbox"
            checked={form.active}
            onChange={e => setForm({ ...form, active: e.target.checked })}
            className="w-5 h-5"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Existing Photos</label>
          <div className="flex gap-2 flex-wrap">
            {existingPhotos.map(photo => (
              <div key={photo.id} className="relative">
                <img src={photo.image} alt={photo.filename} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(photo.id)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2"
                  title="Remove"
                >×</button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Add Photos</label>
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            onChange={handlePhotosChange}
            className="block"
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {photoPreviews.map((src, idx) => (
              <div key={idx} className="relative">
                <img src={src} alt={`New upload ${idx + 1}`} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveNewPhoto(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2"
                  title="Remove"
                >×</button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded font-semibold"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;