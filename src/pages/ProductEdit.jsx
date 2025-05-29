import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
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

  const handleSubmit = async (form, photos, existingPhotos) => {
    setError("");
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
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

  if (loading || !form) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <ProductForm
        initialValues={form}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        photos={photos}
        setPhotos={setPhotos}
        photoPreviews={photoPreviews}
        setPhotoPreviews={setPhotoPreviews}
        existingPhotos={existingPhotos}
        setExistingPhotos={setExistingPhotos}
        isEdit={true}
      />
    </div>
  );
};

export default ProductEdit;