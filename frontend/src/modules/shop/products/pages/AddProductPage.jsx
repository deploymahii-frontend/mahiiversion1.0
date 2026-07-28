import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import * as productService from "../services/product.service";
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

    async function saveProduct(formData) {

        try {

            setLoading(true);

            await productService.createProduct(formData);

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
