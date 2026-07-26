import React, { useState } from "react";
import { Eye, EyeOff, Search } from "lucide-react";
import clsx from "clsx";

const Input = ({
  label,
  error,
  type = "text",
  leftIcon,
  rightIcon,
  searchable = false,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div
        className={clsx(
          "flex items-center rounded-xl border bg-white px-4 transition-all",
          error
            ? "border-red-500"
            : "border-slate-300 focus-within:border-blue-600",
          className
        )}
      >
        {searchable ? (
          <Search size={18} className="mr-3 text-slate-400" />
        ) : (
          leftIcon && (
            <span className="mr-3 text-slate-400">{leftIcon}</span>
          )
        )}

        <input
          className="flex-1 bg-transparent py-3 outline-none"
          type={inputType}
          {...props}
        />

        {type === "password" ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : (
          rightIcon && (
            <span className="ml-3 text-slate-400">{rightIcon}</span>
          )
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
