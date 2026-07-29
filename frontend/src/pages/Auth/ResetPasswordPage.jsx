import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "../../validation/password.validation";
import { resetPassword } from "../../services/auth.service";

export default function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    async function onSubmit(values) {
        try {
            setLoading(true);
            await resetPassword({
                token,
                password: values.password,
                confirmPassword: values.confirmPassword,
            });
            toast.success("Password updated successfully.");
            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Password reset failed or token expired."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    Reset Password
                </h1>
                <p className="mb-8 text-gray-500">
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="New Password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            placeholder="Confirm New Password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-lg py-3 text-white transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-sm text-gray-600 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
