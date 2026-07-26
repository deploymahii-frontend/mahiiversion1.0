import LoginForm from "../components/LoginForm";
import { Store, TrendingUp, ShoppingBag, Users } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-100 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Section */}
        <div className="hidden lg:block">

          <div className="mb-10">

            <div className="inline-flex items-center gap-3">

              <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                M
              </div>

              <div>
                <h1 className="text-4xl font-black text-gray-900">
                  Mahii Business
                </h1>

                <p className="text-gray-500 mt-2">
                  Grow your restaurant with Mahii
                </p>
              </div>

            </div>

          </div>

          <h2 className="text-5xl font-black leading-tight text-gray-900">
            Manage your restaurant
            <br />
            from one dashboard.
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">
            Orders, Products, Staff, Analytics, Marketing,
            Customers and Revenue —
            everything in one beautiful platform.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-14">

            <Feature
              icon={<ShoppingBag size={26} />}
              title="Orders"
              text="Track live orders in real time."
            />

            <Feature
              icon={<TrendingUp size={26} />}
              title="Analytics"
              text="Understand your business growth."
            />

            <Feature
              icon={<Users size={26} />}
              title="Customers"
              text="Know your returning customers."
            />

            <Feature
              icon={<Store size={26} />}
              title="Products"
              text="Manage menus and inventory."
            />

          </div>

        </div>

        {/* Right Section */}

        <div className="flex justify-center">

          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 p-10">

            <div className="text-center mb-10">

              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                M
              </div>

              <h2 className="text-3xl font-bold mt-6 text-gray-900">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-2">
                Sign in to your business dashboard.
              </p>

            </div>

            <LoginForm />

          </div>

        </div>

      </div>

    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex gap-4">

      <div className="h-14 w-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
        {icon}
      </div>

      <div>

        <h3 className="font-bold text-lg text-gray-900">
          {title}
        </h3>

        <p className="text-gray-500">
          {text}
        </p>

      </div>

    </div>
  );
}
