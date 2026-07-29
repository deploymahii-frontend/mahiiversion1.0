import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as AuthService from "../services/auth.service";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "customer",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await AuthService.signup(data);

      toast.success(
        "Account created successfully."
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">

        <h1 className="text-3xl font-bold">
          Join Mahii 🚀
        </h1>

        <p className="text-gray-500 mt-2">
          Create your Mahii account.
        </p>

        <form
          className="space-y-5 mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label>Full Name</label>
            <input
              className="w-full border rounded-xl mt-2 px-4 py-3"
              {...register("fullName", {
                required: true,
              })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">
                Full name is required.
              </p>
            )}
          </div>

          <div>
            <label>Phone</label>
            <input
              className="w-full border rounded-xl mt-2 px-4 py-3"
              {...register("phone", {
                required: true,
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">
                Phone is required.
              </p>
            )}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full border rounded-xl mt-2 px-4 py-3"
              {...register("email")}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              className="w-full border rounded-xl mt-2 px-4 py-3"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                Password is required.
              </p>
            )}
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              className="w-full border rounded-xl mt-2 px-4 py-3"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password ||
                  "Passwords do not match.",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label>Register As</label>
            <select
              className="w-full border rounded-xl mt-2 px-4 py-3"
              {...register("role")}
            >
              <option value="customer">
                Customer
              </option>
              <option value="shop_owner">
                Shop Owner
              </option>
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 rounded-xl py-3 font-semibold"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?
          <Link
            to="/login"
            className="ml-2 text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
