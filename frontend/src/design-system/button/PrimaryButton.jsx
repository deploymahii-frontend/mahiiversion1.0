import clsx from "clsx";

export default function PrimaryButton({
    children,
    onClick,
    type = "button",
    loading = false,
    disabled = false,
    icon: Icon,
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                "inline-flex items-center justify-center gap-2",
                "rounded-2xl",
                "px-5 py-3",
                "font-semibold",
                "transition-all duration-300",
                "bg-blue-600 text-white",
                "hover:bg-blue-700",
                "active:scale-95",
                "disabled:opacity-50",
                className
            )}
        >
            {Icon && <Icon size={18} />}
            {loading ? "Loading..." : children}
        </button>
    );
}
