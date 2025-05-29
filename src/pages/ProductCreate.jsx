import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [existingPhotos] = useState([]); // Not used in create

  const handleSubmit = async (form, photos) => {
    setError("");
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
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
      navigate("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-400">Register New Product</h1>
      <ProductForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        photos={photos}
        setPhotos={setPhotos}
        photoPreviews={photoPreviews}
        setPhotoPreviews={setPhotoPreviews}
        existingPhotos={existingPhotos}
        setExistingPhotos={() => {}}
        isEdit={false}
      />
    </div>
  );
};

export default ProductCreate;