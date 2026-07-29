// src/modules/auth/pages/ForgotPasswordPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import AuthLayout from "../components/AuthLayout";
import * as authService from "../services/auth.service";

export default function ForgotPasswordPage() {

    const navigate = useNavigate();

    const {

        register,

        handleSubmit,

        formState: {

            errors,

        },

    } = useForm({

        mode: "onTouched",

    });

    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    async function onSubmit(values) {

        try {

            setLoading(true);

            await authService.forgotPassword(values);

            setSuccess(true);

            toast.success(

                "OTP sent successfully"

            );

            navigate(

                "/reset-password",

                {

                    state: {

                        email:
                            values.email,

                        phone:
                            values.phone,

                    },

                }

            );

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to send OTP"

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <AuthLayout

            title="Forgot Password"

            subtitle="Recover your Mahii account"

        >

            <form

                onSubmit={handleSubmit(onSubmit)}

                className="space-y-6"

            >

                <div>

                    <label>

                        Email or Mobile

                    </label>

                    <input

                        className="mt-2 w-full rounded-xl border p-3"

                        placeholder="Enter email or mobile"

                        {...register(

                            "email",

                            {

                                required:
                                    "Email or Mobile is required",

                            }

                        )}

                    />

                    {

                        errors.email && (

                            <p className="text-red-500 text-sm mt-1">

                                {

                                    errors.email.message

                                }

                            </p>

                        )

                    }

                </div>

                {

                    success && (

                        <div className="rounded-xl bg-green-100 border border-green-300 p-3 text-green-700">

                            Reset OTP has been sent.

                        </div>

                    )

                }

                <button

                    disabled={loading}

                    className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold"

                >

                    {

                        loading

                            ? "Sending..."

                            : "Send OTP"

                    }

                </button>

            </form>

        </AuthLayout>

    );

}
