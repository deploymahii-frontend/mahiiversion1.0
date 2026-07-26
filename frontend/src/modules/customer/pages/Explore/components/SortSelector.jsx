const options = ["Relevance", "Nearest", "Highest Rated", "Newest", "Price Low", "Price High"];

export default function SortSelector({ sort, setSort }) {
  return (
    <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border p-3">
      {options.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
}
