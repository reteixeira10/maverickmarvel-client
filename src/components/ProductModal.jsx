import React, { useEffect, useState } from "react";
import {
  Package,
  Tag,
  Layers,
  Palette,
  Ruler,
  Weight,
  DollarSign,
  ShoppingCart,
  Globe,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  Store
} from "lucide-react";

const ProductModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);

    const API_BASE_URL = process.env.REACT_APP_API_URL || "";

    fetch(`${API_BASE_URL}/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setCurrent(0);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (!productId || !product) return null;

  const photos = product.photos || [];
  const hasPhotos = photos.length > 0;

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-0 max-w-6xl w-full relative max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-3xl font-bold z-10"
        >
          &times;
        </button>
        {loading ? (
          <div className="text-center py-16 text-lg font-semibold">Loading...</div>
        ) : (
          <div>
            {/* Top: Image Gallery */}
            <div className="w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-t-xl p-6">
              {hasPhotos ? (
                <>
                  <div className="relative w-full flex justify-center">
                    <img
                      src={photos[current].image}
                      alt={photos[current].filename}
                      className="h-72 max-w-full object-contain rounded shadow"
                    />
                    {photos.length > 1 && (
                      <>
                        <button
                          onClick={prevPhoto}
                          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-60 text-white rounded-full p-2 hover:bg-opacity-90"
                        >
                          &#8592;
                        </button>
                        <button
                          onClick={nextPhoto}
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-60 text-white rounded-full p-2 hover:bg-opacity-90"
                        >
                          &#8594;
                        </button>
                      </>
                    )}
                  </div>
                  {photos.length > 1 && (
                    <div className="flex gap-2 mt-3">
                      {photos.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrent(idx)}
                          className={`w-3 h-3 rounded-full border-2 ${idx === current ? "bg-green-700 border-green-700" : "bg-gray-300 border-gray-400"}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-400 italic">No photo available</div>
              )}
            </div>
            {/* Product Info */}
            <div className="p-8">
              <h2 className="text-3xl font-bold flex items-center gap-2 mb-6">
                <Package className="w-7 h-7" />
                {product.name}
              </h2>
              <div className="grid grid-cols-1 gap-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  <span className="font-semibold">SKU:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.SKU}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  <span className="font-semibold">Category:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  <span className="font-semibold">Material:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.material}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  <span className="font-semibold">Colors:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.colors}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  <span className="font-semibold">Dimensions:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.dimensions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="w-5 h-5" />
                  <span className="font-semibold">Weight:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.weight} kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Cost:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.cost}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-semibold">Orders:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.orders}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold">Origin:</span>
                  <span className="ml-1 italic text-blue-700 dark:text-blue-300">{product.origin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Print Time:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.print_time}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.active ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <span className="font-semibold">Active:</span>
                  <span className="ml-1 text-gray-700 dark:text-gray-200">{product.active ? "Yes" : "No"}</span>
                </div>
              </div>
              <hr className="my-6 border-gray-300 dark:border-gray-700" />
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5" />
                    <span className="font-semibold">Print Instruction:</span>
                  </div>
                  <pre className="whitespace-pre-line bg-gray-100 dark:bg-gray-900 rounded p-2 mt-1 text-gray-800 dark:text-gray-100">{product.print_instruction}</pre>
                </div>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5" />
                    <span className="font-semibold">Copywriting:</span>
                  </div>
                  <pre className="whitespace-pre-line bg-gray-100 dark:bg-gray-900 rounded p-2 mt-1 text-gray-800 dark:text-gray-100">{product.copywriting}</pre>
                </div>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Store className="w-5 h-5" />
                    <span className="font-semibold">Marketplace:</span>
                  </div>
                  <pre className="whitespace-pre-line bg-gray-100 dark:bg-gray-900 rounded p-2 mt-1 text-gray-800 dark:text-gray-100">{product.marketplace}</pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;