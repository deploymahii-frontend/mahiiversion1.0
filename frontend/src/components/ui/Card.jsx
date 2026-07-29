export default function Card({ children, className = "" }) {
  return <div className={`rounded-2xl bg-white p-4 shadow-sm ${className}`.trim()}>{children}</div>;
}
