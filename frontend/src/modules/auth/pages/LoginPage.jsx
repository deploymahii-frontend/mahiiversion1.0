// src/modules/auth/pages/LoginPage.jsx

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {

    return (

        <>

            <Helmet>

                <title>

                    Login | Mahii

                </title>

                <meta

                    name="description"

                    content="Login to Mahii and discover trusted local shops, restaurants, cafés, hotels, messes and nearby services."

                />

                <meta

                    name="robots"

                    content="index,follow"

                />

            </Helmet>

            <AuthLayout

                title="Welcome Back"

                subtitle="Login to continue your Mahii journey"

                footer={

                    <div className="text-center text-sm text-gray-500">

                        By continuing, you agree to Mahii's{" "}

                        <Link

                            to="/terms"

                            className="text-blue-600 hover:underline"

                        >

                            Terms

                        </Link>

                        {" "}and{" "}

                        <Link

                            to="/privacy"

                            className="text-blue-600 hover:underline"

                        >

                            Privacy Policy

                        </Link>

                    </div>

                }

            >

                <LoginForm />

            </AuthLayout>

        </>

    );

}
