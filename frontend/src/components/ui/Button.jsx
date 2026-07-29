export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
