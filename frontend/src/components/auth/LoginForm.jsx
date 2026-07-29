import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/auth.validation";
import PasswordInput from "./PasswordInput";
import RememberMe from "./RememberMe";

export default function LoginForm({ onSubmit, loading }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <input
                    {...register("phone")}
                    placeholder="Phone Number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <PasswordInput register={register} error={errors.password} />

            <div className="flex items-center justify-between">
                <RememberMe register={register} />
                <a href="/forgot-password" className="text-sm text-yellow-600 hover:underline">
                    Forgot Password?
                </a>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-lg py-3 text-white transition duration-200 disabled:opacity-50"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
