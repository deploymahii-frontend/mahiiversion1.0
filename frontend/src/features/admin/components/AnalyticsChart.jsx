export default function AnalyticsChart({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}

      </div>

      <div className="h-80">
        {children}
      </div>

    </div>
  );
}
