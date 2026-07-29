// src/modules/auth/pages/VerifyOtpPage.jsx

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import OtpInput from "../components/OtpInput";
import useOtp from "../hooks/useOtp";

export default function VerifyOtpPage() {

    const location = useLocation();

    const email = location.state?.email || "";

    const phone = location.state?.phone || "";

    const [

        otp,

        setOtp,

    ] = useState(

        new Array(6).fill("")

    );

    const {

        verifyOtp,

        resendOtp,

        loading,

        error,

        counter,

        canResend,

    } = useOtp();

    function submitOtp() {

        verifyOtp({

            email,

            phone,

            otp: otp.join(""),

        });

    }

    useEffect(() => {

        if (

            otp.join("").length === 6

        ) {

            submitOtp();

        }

    }, [otp]);

    return (

        <AuthLayout

            title="Verify OTP"

            subtitle="Enter the verification code"

        >

            <div className="space-y-8">

                <OtpInput

                    value={otp}

                    onChange={setOtp}

                />

                {

                    error && (

                        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-red-600">

                            {error}

                        </div>

                    )

                }

                <button

                    disabled={

                        loading ||

                        otp.join("").length !== 6

                    }

                    onClick={submitOtp}

                    className="w-full rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-60"

                >

                    {

                        loading

                            ? "Verifying..."

                            : "Verify OTP"

                    }

                </button>

                <div className="text-center">

                    {

                        canResend

                            ? (

                                <button

                                    onClick={() =>

                                        resendOtp({

                                            email,

                                            phone,

                                        })

                                    }

                                    className="text-blue-600 font-semibold"

                                >

                                    Resend OTP

                                </button>

                            )

                            : (

                                <p className="text-gray-500">

                                    Resend OTP in {counter}s

                                </p>

                            )

                    }

                </div>

            </div>

        </AuthLayout>

    );

}
