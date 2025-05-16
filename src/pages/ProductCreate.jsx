import React from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-400">Register New Product</h1>
      <ProductForm
        onSuccess={() => navigate("/products")}
      />
    </div>
  );
};

export default ProductCreate;