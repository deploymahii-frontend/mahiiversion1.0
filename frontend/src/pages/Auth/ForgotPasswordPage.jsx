import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPasswordSchema } from "../../validation/password.validation";
import { forgotPassword } from "../../services/auth.service";

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    async function onSubmit(values) {
        try {
            setLoading(true);
            await forgotPassword(values.email);
            setSent(true);
            toast.success("Password reset link sent to your email.");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to send reset link."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    Forgot Password
                </h1>
                <p className="mb-8 text-gray-500">
                    Enter your email address to receive a password reset link.
                </p>

                {sent ? (
                    <div className="text-center py-4">
                        <p className="text-green-600 font-medium mb-4">
                            Reset link sent! Please check your inbox.
                        </p>
                        <Link to="/login" className="text-yellow-600 font-semibold hover:underline">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Email Address"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-lg py-3 text-white transition duration-200 disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                        <div className="text-center mt-4">
                            <Link to="/login" className="text-sm text-gray-600 hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
