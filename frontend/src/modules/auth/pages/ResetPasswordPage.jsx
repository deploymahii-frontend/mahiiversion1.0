// src/modules/auth/pages/ResetPasswordPage.jsx

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

import AuthLayout from "../components/AuthLayout";
import * as authService from "../services/auth.service";

export default function ResetPasswordPage() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";

    const phone = location.state?.phone || "";

    const {

        register,

        handleSubmit,

        watch,

        formState: {

            errors,

        },

    } = useForm({

        mode: "onTouched",

    });

    const [

        loading,

        setLoading,

    ] = useState(false);

    const [

        showPassword,

        setShowPassword,

    ] = useState(false);

    const [

        showConfirm,

        setShowConfirm,

    ] = useState(false);

    const password = watch("password", "");

    const strength = useMemo(() => {

        let score = 0;

        if (password.length >= 8) score++;

        if (/[A-Z]/.test(password)) score++;

        if (/[0-9]/.test(password)) score++;

        if (/[^A-Za-z0-9]/.test(password)) score++;

        return score;

    }, [password]);

    function strengthLabel() {

        return [

            "",

            "Weak",

            "Fair",

            "Good",

            "Strong",

        ][strength];

    }

    async function onSubmit(values) {

        try {

            setLoading(true);

            await authService.resetPassword({

                email,

                phone,

                otp: values.otp,

                password: values.password,

            });

            toast.success(

                "Password changed successfully"

            );

            navigate("/login");

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to reset password"

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <AuthLayout

            title="Reset Password"

            subtitle="Create a new secure password"

        >

            <form

                onSubmit={handleSubmit(onSubmit)}

                className="space-y-5"

            >

                {/* OTP */}

                <div>

                    <label>

                        Verification OTP

                    </label>

                    <input

                        className="mt-2 w-full rounded-xl border p-3"

                        placeholder="Enter OTP"

                        {...register("otp", {

                            required:
                                "OTP is required",

                        })}

                    />

                    {

                        errors.otp && (

                            <p className="text-red-500 text-sm">

                                {

                                    errors.otp.message

                                }

                            </p>

                        )

                    }

                </div>

                {/* Password */}

                <div>

                    <label>

                        New Password

                    </label>

                    <div className="relative mt-2">

                        <input

                            type={

                                showPassword

                                    ? "text"

                                    : "password"

                            }

                            className="w-full rounded-xl border p-3 pr-12"

                            {...register(

                                "password",

                                {

                                    required:
                                        "Password required",

                                    minLength: {

                                        value: 8,

                                        message:

                                            "Minimum 8 characters",

                                    },

                                }

                            )}

                        />

                        <button

                            type="button"

                            className="absolute right-4 top-4"

                            onClick={() =>

                                setShowPassword(

                                    previous => !previous

                                )

                            }

                        >

                            {

                                showPassword

                                    ? <FaEyeSlash />

                                    : <FaEye />

                            }

                        </button>

                    </div>

                    <div className="mt-2">

                        <div className="h-2 rounded bg-gray-200">

                            <div

                                className="h-2 rounded bg-green-600"

                                style={{

                                    width:

                                        `${strength * 25}%`

                                }}

                            />

                        </div>

                        <p className="text-sm mt-1">

                            {

                                strengthLabel()

                            }

                        </p>

                    </div>

                </div>

                {/* Confirm Password */}

                <div>

                    <label>

                        Confirm Password

                    </label>

                    <div className="relative mt-2">

                        <input

                            type={

                                showConfirm

                                    ? "text"

                                    : "password"

                            }

                            className="w-full rounded-xl border p-3 pr-12"

                            {...register(

                                "confirmPassword",

                                {

                                    validate: value =>

                                        value === password ||

                                        "Passwords do not match",

                                }

                            )}

                        />

                        <button

                            type="button"

                            className="absolute right-4 top-4"

                            onClick={() =>

                                setShowConfirm(

                                    previous => !previous

                                )

                            }

                        >

                            {

                                showConfirm

                                    ? <FaEyeSlash />

                                    : <FaEye />

                            }

                        </button>

                    </div>

                    {

                        errors.confirmPassword && (

                            <p className="text-red-500 text-sm">

                                {

                                    errors.confirmPassword.message

                                }

                            </p>

                        )

                    }

                </div>

                <button

                    disabled={loading}

                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"

                >

                    {

                        loading

                            ? "Updating..."

                            : "Reset Password"

                    }

                </button>

            </form>

        </AuthLayout>

    );

}
