import { useState } from "react";
import ProductImageUploader from "./ProductImageUploader";

export default function ProductForm({

    initialValues = {},

    categories = [],

    onSubmit,

    loading,

}) {

    const [images, setImages] = useState(
        initialValues.images?.map((url) => ({
            id: crypto.randomUUID(),
            preview: url,
            primary: false,
        })) || []
    );

    const [form, setForm] = useState({

        name: initialValues.name || "",

        description: initialValues.description || "",

        category: initialValues.category?._id || initialValues.category || "",

        price: initialValues.price || "",

        mrp: initialValues.mrp || "",

        stock: initialValues.stock || "",

        preparationTime:
            initialValues.preparationTime || 15,

        pureVeg:
            initialValues.pureVeg || false,

        available:
            initialValues.available ?? true,

    });

    function change(e) {

        const {

            name,

            value,

            checked,

            type,

        } = e.target;

        if (type === "checkbox") {

            setForm({

                ...form,

                [name]: checked,

            });

            return;

        }

        setForm({

            ...form,

            [name]: value,

        });

    }

    function submit(e) {

        e.preventDefault();

        const data = new FormData();

        Object.entries(form).forEach(

            ([key, value]) => {

                data.append(key, value);

            }

        );

        images.forEach(image => {
            if (image.file) {
                data.append("images", image.file);
            }
        });

        const primary = images.find(img => img.primary);
        if (primary && primary.file) {
            data.append("primaryImage", primary.file.name);
        }

        onSubmit(data);

    }

    return (

        <form
            onSubmit={submit}
            className="bg-white rounded-xl p-8 space-y-6 shadow"
        >

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input

                    name="name"

                    placeholder="Product Name"

                    value={form.name}

                    onChange={change}

                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    required

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea

                    name="description"

                    placeholder="Description"

                    rows={4}

                    value={form.description}

                    onChange={change}

                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select

                    name="category"

                    value={form.category}

                    onChange={change}

                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"

                    required

                >

                    <option value="">

                        Select Category

                    </option>

                    {

                        categories.map(cat => (

                            <option

                                key={cat._id}

                                value={cat._id}

                            >

                                {cat.name}

                            </option>

                        ))

                    }

                </select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
                    <input

                        type="number"

                        name="price"

                        placeholder="Selling Price"

                        value={form.price}

                        onChange={change}

                        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

                        required

                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹)</label>
                    <input

                        type="number"

                        name="mrp"

                        placeholder="MRP"

                        value={form.mrp}

                        onChange={change}

                        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input

                        type="number"

                        name="stock"

                        placeholder="Stock"

                        value={form.stock}

                        onChange={change}

                        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

                        required

                    />
                </div>

            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Time (mins)</label>
                <input

                    type="number"

                    name="preparationTime"

                    placeholder="Preparation Time"

                    value={form.preparationTime}

                    onChange={change}

                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
            </div>

            <div className="flex gap-8">

                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">

                    <input

                        type="checkbox"

                        name="pureVeg"

                        checked={form.pureVeg}

                        onChange={change}

                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"

                    />

                    Pure Veg

                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">

                    <input

                        type="checkbox"

                        name="available"

                        checked={form.available}

                        onChange={change}

                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"

                    />

                    Available

                </label>

            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <ProductImageUploader
                    images={images}
                    setImages={setImages}
                />
            </div>

            <button

                disabled={loading}

                className="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-8 py-3 rounded-lg transition disabled:opacity-50"

            >

                {

                    loading

                        ? "Saving..."

                        : "Save Product"

                }

            </button>

        </form>

    );

}
