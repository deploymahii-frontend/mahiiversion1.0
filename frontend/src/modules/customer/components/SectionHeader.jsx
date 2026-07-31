export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
