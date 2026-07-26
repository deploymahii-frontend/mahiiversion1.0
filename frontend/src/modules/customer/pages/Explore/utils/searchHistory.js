const KEY = "mahii_recent_searches";

export function saveSearch(query) {
  const old = JSON.parse(localStorage.getItem(KEY)) || [];
  const updated = [query, ...old.filter((q) => q !== query)].slice(0, 10);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getSearchHistory() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
