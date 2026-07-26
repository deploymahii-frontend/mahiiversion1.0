export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-gray-500">{subtitle}</p>
      </div>

      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
