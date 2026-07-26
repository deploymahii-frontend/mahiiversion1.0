import { Clock, TrendingUp, Search } from "lucide-react";

export default function SearchSuggestions({ query, suggestions = [], recent = [], trending = [], onSelect }) {
  if (query.length === 0) {
    return (
      <div className="rounded-xl bg-white shadow">
        {recent.length > 0 && (
          <>
            <div className="px-4 pb-2 pt-4 text-sm font-semibold">Recent Searches</div>
            {recent.map((item) => (
              <button key={item} onClick={() => onSelect(item)} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50">
                <Clock size={16} />
                {item}
              </button>
            ))}
          </>
        )}

        <div className="px-4 pb-2 pt-4 text-sm font-semibold">Trending</div>
        {trending.map((item) => (
          <button key={item} onClick={() => onSelect(item)} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50">
            <TrendingUp size={16} />
            {item}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      {suggestions.map((item) => (
        <button key={item.id} onClick={() => onSelect(item.name)} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50">
          <Search size={16} />
          {item.name}
        </button>
      ))}
    </div>
  );
}
