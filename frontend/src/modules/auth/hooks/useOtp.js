import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import * as authService from "../services/auth.service";

const RESEND_SECONDS = 60;

export default function useOtp() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [counter, setCounter] = useState(RESEND_SECONDS);

    const [canResend, setCanResend] = useState(false);

    useEffect(() => {

        if (counter <= 0) {

            setCanResend(true);

            return;

        }

        const timer = setTimeout(() => {

            setCounter(previous => previous - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [counter]);

    async function verifyOtp(payload) {

        try {

            setLoading(true);

            setError(null);

            const { data } =
                await authService.verifyOtp(payload);

            const {

                accessToken,

                refreshToken,

                user,

            } = data.data;

            localStorage.setItem(
                "accessToken",
                accessToken
            );

            localStorage.setItem(
                "refreshToken",
                refreshToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            toast.success("OTP verified successfully");

            const normalizedRole = String(user?.role?.name || user?.role || "").toUpperCase();

            switch (normalizedRole) {

                case "ADMIN":
                case "SUPER_ADMIN":
                    navigate("/admin/dashboard");
                    break;

                case "SHOP_OWNER":
                case "SHOPOWNER":
                    navigate("/shopowner/dashboard");
                    break;

                case "CUSTOMER":
                case "USER":
                    navigate("/customer/dashboard");
                    break;

                default:
                    navigate("/");
                    break;

            }

        } catch (err) {

            const message =
                err.response?.data?.message ||
                "Invalid OTP.";

            setError(message);

            toast.error(message);

        } finally {

            setLoading(false);

        }

    }

    async function resendOtp(payload) {

        if (!canResend) return;

        try {

            setLoading(true);

            await authService.resendOtp(payload);

            toast.success("OTP sent successfully");

            setCounter(RESEND_SECONDS);

            setCanResend(false);

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to resend OTP."

            );

        } finally {

            setLoading(false);

        }

    }

    return {

        verifyOtp,

        resendOtp,

        loading,

        error,

        counter,

        canResend,

    };

}
