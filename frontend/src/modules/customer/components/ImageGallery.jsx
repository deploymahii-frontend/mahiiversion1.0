// src/modules/customer/components/ImageGallery.jsx

import { useState } from "react";

export default function ImageGallery({ images = [] }) {
    const [selected, setSelected] = useState(0);
    const gallery = images.length ? images : ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80"];

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl bg-gray-100">
                <img
                    src={gallery[selected]}
                    alt={`Gallery image ${selected + 1}`}
                    className="h-[420px] w-full object-cover"
                />
            </div>
            <div className="grid grid-cols-4 gap-3">
                {gallery.map((image, index) => (
                    <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelected(index)}
                        className={`overflow-hidden rounded-3xl border ${
                            selected === index ? "border-blue-600" : "border-gray-200"
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-24 w-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
