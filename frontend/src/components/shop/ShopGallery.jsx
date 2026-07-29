import { useState } from "react";
import { FiImage, FiX } from "react-icons/fi";

export default function ShopGallery({ shop }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = shop?.gallery || [];

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiImage className="text-orange-500 text-2xl" />
          <h2 className="text-2xl font-bold">Gallery</h2>
        </div>

        {images.length === 0 ? (
          <p className="text-gray-500">No gallery images available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                onClick={() => setSelectedImage(image)}
                className="h-44 w-full object-cover rounded-2xl cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white"
            >
              <FiX size={32} />
            </button>

            <img
              src={selectedImage}
              alt="Gallery Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}
