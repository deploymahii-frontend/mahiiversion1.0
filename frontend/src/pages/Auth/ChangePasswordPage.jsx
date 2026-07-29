import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { changePasswordSchema } from "../../validation/password.validation";
import { changePassword } from "../../services/auth.service";
import PasswordStrength from "../../components/auth/PasswordStrength";

export default function ChangePasswordPage() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
    });

    const newPassword = watch("newPassword", "");

    async function onSubmit(values) {
        try {
            setLoading(true);
            await changePassword(values);
            toast.success("Password changed successfully.");
            reset();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Change password failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <input
                        type="password"
                        {...register("oldPassword")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.oldPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                        type="password"
                        {...register("newPassword")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <PasswordStrength password={newPassword} />
                    {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-lg py-3 text-white transition duration-200 disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
}
