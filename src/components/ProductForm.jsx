import React, { useState, useEffect } from "react";

// REACT_APP_API_URL will be set by Render for the deployed static site
// For local development, if REACT_APP_API_URL is not set, it will default to an empty string,
// making the fetch relative ("/api/products"), which then gets handled by your local proxy.
// const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const ProductForm = ({
  initialValues = {},
  onSubmit,
  loading,
  error,
  photos,
  setPhotos,
  photoPreviews,
  setPhotoPreviews,
  existingPhotos,
  setExistingPhotos,
  isEdit = false,
}) => {
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
    ...initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      setForm((prev) => {
        // Only update if values are different
        const prevString = JSON.stringify(prev);
        const initString = JSON.stringify(initialValues);
        if (prevString !== initString) {
          return { ...prev, ...initialValues };
        }
        return prev;
      });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(initialValues)]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setPhotoPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleRemovePhoto = (photoId) => {
    setExistingPhotos(existingPhotos.filter((p) => p.id !== photoId));
  };

  const handleRemoveNewPhoto = (idx) => {
    setPhotos(photos.filter((_, i) => i !== idx));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, photos, existingPhotos);
  };

  return (
    <form
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>
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
      {/* Existing Photos (edit mode only) */}
      {isEdit && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Existing Photos</label>
          <div className="flex gap-2 flex-wrap">
            {existingPhotos.map((photo) => (
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
      )}
      {/* Add Photos */}
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
        {photoPreviews.length > 0 && (
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
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded transition disabled:opacity-50"
      >
        {loading ? (isEdit ? "Saving..." : "Adding...") : isEdit ? "Save Changes" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;