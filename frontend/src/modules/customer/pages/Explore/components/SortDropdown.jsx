const options = [
  "Nearest",
  "Highest Rated",
  "Trending",
  "Newest",
  "Most Reviewed",
  "Best Value",
];

export default function SortDropdown() {
  return (
    <div className="relative inline-block text-left">
      <select className="rounded-3xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm shadow-sm focus:border-yellow-400 focus:outline-none">
        {options.map((option) => (
          <option key={option} value={option.toLowerCase().replace(/ /g, "-")}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
