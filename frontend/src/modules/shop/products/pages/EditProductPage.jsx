import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import * as productService from "../services/product.service";
import shopOwnerService from "@/modules/shopOwner/services/shopOwner.service";
import api from "@/services/api";
import { toast } from "react-hot-toast";

export default function EditProductPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadData();

    }, [id]);

    async function loadData() {

        try {

            const [

                productRes,

                categoryRes,

            ] = await Promise.all([

                productService.getProduct(id),

                api.get("/categories"),

            ]);

            setProduct(productRes.data?.data || productRes.data || productRes);

            setCategories(categoryRes.data?.data || categoryRes.data || categoryRes || []);

        } catch {

            toast.error("Unable to load product.");

        }

    }

    async function updateProduct(payload) {

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

            await shopOwnerService.updateProduct(
                id,
                {
                    ...payload,
                    images: orderedUrls,
                }
            );

            toast.success("Product updated.");

            navigate("/shop/products");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Update failed."

            );

        } finally {

            setLoading(false);

        }

    }

    if (!product)
        return <div className="p-8">Loading Product...</div>;

    return (

        <div className="p-8 max-w-4xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">

                Edit Product

            </h1>

            <ProductForm

                initialValues={product}

                categories={categories}

                loading={loading}

                onSubmit={updateProduct}

            />

        </div>

    );

}
