import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({ register, error }) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                {...register("password")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Password"
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
            >
                {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}
