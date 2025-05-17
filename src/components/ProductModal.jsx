import React, { useEffect, useState } from "react";

const ProductModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setCurrent(0);
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
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl"
        >
          &times;
        </button>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            {hasPhotos && (
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-full flex justify-center">
                  <img
                    src={photos[current].image}
                    alt={photos[current].filename}
                    className="h-80 max-w-full object-contain rounded"
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
                  <div className="flex gap-2 mt-2">
                    {photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full ${idx === current ? "bg-green-700" : "bg-gray-400"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="mb-1"><span className="font-medium">Material:</span> {product.material}</p>
            <p className="mb-1"><span className="font-medium">Weight:</span> {product.weight} kg</p>
            {/* Add more fields as needed */}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductModal;