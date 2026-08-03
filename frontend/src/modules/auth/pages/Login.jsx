import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useAuthStore from "../store/auth.store";
import * as AuthService from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const setLoading = useAuthStore(
    (state) => state.setLoading
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setLoading(true);

      const normalizedPayload = {
        ...(data.phone ? { phone: data.phone } : {}),
        ...(data.email ? { email: data.email } : {}),
        password: data.password,
      };

      const response = await AuthService.login(normalizedPayload);

      const {
        user,
        accessToken,
      } = response.data.data;

      login(user, accessToken);

      toast.success("Login Successful");

      switch (String(user.role).toLowerCase()) {
        case "customer":
        case "user":
          navigate("/customer/dashboard");
          break;

        case "shop_owner":
        case "shopowner":
          navigate("/dashboard");
          break;

        case "admin":
        case "super_admin":
        case "superadmin":
          navigate("/admin/dashboard");
          break;

        default:
          navigate("/customer/dashboard");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">

        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Login to continue using Mahii.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="font-medium">
              Phone Number
            </label>

            <input
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="9876543210"
              {...register("phone", {
                required: true,
              })}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                Phone is required
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">
              Password
            </label>

            <input
              type="password"
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password is required
              </p>
            )}
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-blue-600"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={submitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl py-3 transition"
          >
            {submitting
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-2 text-blue-600 font-semibold"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
