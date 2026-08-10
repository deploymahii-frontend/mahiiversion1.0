import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import * as productService from "../services/product.service";
import shopOwnerService from "@/modules/shopOwner/services/shopOwner.service";
import api from "@/services/api";
import { toast } from "react-hot-toast";

export default function AddProductPage() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadCategories();

    }, []);

    async function loadCategories() {

        try {

            const { data } =
                await api.get("/categories");

            setCategories(data.data || data || []);

        } catch (error) {

            toast.error("Unable to load categories.");

        }

    }

    async function saveProduct(payload) {

        try {

            setLoading(true);

            const images = payload.images || [];
            const existingUrls = images.filter((img) => img.url).map((img) => img.url);
            const fileImages = images.filter((img) => img.file);
            let uploadedUrls = [];

            if (fileImages.length > 0) {
                const uploadForm = new FormData();
                fileImages.forEach((img) => uploadForm.append("files", img.file));
                const uploadRes = await productService.uploadImages(uploadForm);
                uploadedUrls = uploadRes?.data?.data?.urls || uploadRes?.data?.urls || [];
            }

            const allUrls = [...existingUrls, ...uploadedUrls];
            const primaryImage = images.find((img) => img.primary);
            let orderedUrls = allUrls;

            if (primaryImage) {
                const primaryUrl = primaryImage.url || uploadedUrls[fileImages.findIndex((img) => img.id === primaryImage.id)];
                if (primaryUrl) {
                    orderedUrls = [
                        primaryUrl,
                        ...allUrls.filter((url) => url !== primaryUrl),
                    ];
                }
            }

            await shopOwnerService.createProduct({
                ...payload,
                images: orderedUrls,
            });

            toast.success("Product added successfully.");

            navigate("/shop/products");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to create product."

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="p-8 max-w-4xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">

                Add Product

            </h1>

            <ProductForm

                categories={categories}

                loading={loading}

                onSubmit={saveProduct}

            />

        </div>

    );

}
