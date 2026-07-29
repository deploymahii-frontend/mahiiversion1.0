import clsx from "clsx";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  outline: "border border-gray-300 bg-white hover:bg-gray-100",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export default function Button({ children, variant = "primary", size = "md", className, ...props }) {
  return (
    <button
      className={clsx("rounded-xl font-medium transition", variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
