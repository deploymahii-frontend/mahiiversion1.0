import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validation/signup.validation";
import PasswordStrength from "./PasswordStrength";

export default function SignupForm({ onSubmit, loading }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const password = watch("password", "");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <input
                        {...register("firstName")}
                        placeholder="First Name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                </div>
                <div>
                    <input
                        {...register("lastName")}
                        placeholder="Last Name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            <div>
                <input
                    type="email"
                    {...register("email")}
                    placeholder="Email Address"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <input
                    {...register("mobile")}
                    placeholder="Mobile Number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.mobile && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
                )}
            </div>

            <div>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <PasswordStrength password={password} />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>

            <div>
                <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register("terms")}
                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    I agree to the Terms & Conditions
                </label>
                {errors.terms && (
                    <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-lg py-3 text-white transition duration-200 disabled:opacity-50 mt-2"
            >
                {loading ? "Creating Account..." : "Sign Up"}
            </button>
        </form>
    );
}
