import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginShop } from "../services/shopAuth.service";

export default function LoginPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await loginShop(form);

            localStorage.setItem(
                "accessToken",
                data.data.accessToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.data.user)
            );

            toast.success("Login Successful");

            navigate("/shop/dashboard");
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-xl w-full max-w-md p-8"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Shop Owner Login
                </h1>

                <input
                    className="w-full border rounded-lg p-3 mb-4"
                    placeholder="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <input
                    className="w-full border rounded-lg p-3 mb-6"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg"
                >
                    {loading ? "Logging In..." : "Login"}
                </button>

            </form>

        </div>
    );
}
