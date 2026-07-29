// src/modules/auth/pages/SignupPage.jsx

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import AuthLayout from "../components/AuthLayout";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {

    return (

        <>

            <Helmet>

                <title>

                    Create Account | Mahii

                </title>

                <meta

                    name="description"

                    content="Create your Mahii account to discover local shops, restaurants, cafés, hotels, messes, and nearby services."

                />

                <meta

                    name="robots"

                    content="index,follow"

                />

                <meta

                    property="og:title"

                    content="Join Mahii"

                />

            </Helmet>

            <AuthLayout

                title="Create Your Account"

                subtitle="Join Mahii and start exploring your local marketplace."

                footer={

                    <div className="text-center text-sm text-gray-500">

                        By creating an account you agree to our{" "}

                        <Link

                            to="/terms"

                            className="text-blue-600 hover:underline"

                        >

                            Terms & Conditions

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

                <SignupForm />

            </AuthLayout>

        </>

    );

}
