import { useRef } from "react";
import { Trash2, Star } from "lucide-react";

export default function ProductImageUploader({
    images = [],
    setImages,
}) {

    const inputRef = useRef();

    function addImages(e) {

        const files = Array.from(e.target.files);

        const mapped = files.map(file => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
            primary: false,
        }));

        setImages(prev => [...prev, ...mapped]);
    }

    function remove(id) {

        setImages(prev =>
            prev.filter(img => img.id !== id)
        );

    }

    function setPrimary(id) {

        setImages(prev =>
            prev.map(img => ({
                ...img,
                primary: img.id === id,
            }))
        );

    }

    function move(index, direction) {

        const updated = [...images];

        const target = index + direction;

        if (target < 0 || target >= updated.length)
            return;

        [updated[index], updated[target]] =
        [updated[target], updated[index]];

        setImages(updated);

    }

    return (

        <div>

            <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition text-sm"
            >
                Upload Images
            </button>

            <input
                ref={inputRef}
                hidden
                multiple
                type="file"
                accept="image/*"
                onChange={addImages}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-6">

                {images.map((image, index) => (

                    <div
                        key={image.id}
                        className="border rounded-xl p-3 bg-gray-50 flex flex-col justify-between"
                    >

                        <img
                            src={image.preview || image.url || image}
                            className="w-full h-36 object-cover rounded-lg"
                            alt=""
                        />

                        <div className="flex justify-between items-center mt-3 pt-2 border-t">

                            <button
                                type="button"
                                onClick={() => setPrimary(image.id)}
                                title="Set as Primary"
                                className="p-1 hover:bg-yellow-100 rounded"
                            >
                                <Star
                                    size={18}
                                    className={image.primary ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() => remove(image.id)}
                                title="Remove Image"
                                className="p-1 hover:bg-red-100 rounded text-red-600"
                            >
                                <Trash2 size={18} />
                            </button>

                        </div>

                        <div className="flex gap-2 mt-2">

                            <button
                                type="button"
                                onClick={() => move(index, -1)}
                                className="border bg-white text-xs px-2 py-1 rounded hover:bg-gray-100 flex-1"
                            >
                                ← Move Left
                            </button>

                            <button
                                type="button"
                                onClick={() => move(index, 1)}
                                className="border bg-white text-xs px-2 py-1 rounded hover:bg-gray-100 flex-1"
                            >
                                Move Right →
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}
