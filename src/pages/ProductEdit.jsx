import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", material: "", weight: "" });
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({ name: data.name, material: data.material, weight: data.weight });
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
    formData.append("material", form.material);
    formData.append("weight", form.weight);
    existingPhotos.forEach(photo => formData.append("keepPhotos", photo.id));
    photos.forEach(file => formData.append("photos", file));
    try {
      const res = await fetch(`/api/products/${id}`, {
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