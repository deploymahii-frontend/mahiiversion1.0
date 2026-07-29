import { useMemo, useState } from "react";
import {
  FiSearch,
  FiBookOpen,
  FiPlus,
  FiEdit2,
  FiEye,
  FiThumbsUp,
  FiTag,
  FiRefreshCw,
} from "react-icons/fi";

export default function KnowledgeBase({
  loading,
  articles = [],
  onCreateArticle,
  onEditArticle,
  onViewArticle,
  onRefresh,
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return articles;

    return articles.filter((article) =>
      `${article.title} ${article.category} ${article.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query, articles]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Knowledge Base
          </h2>

          <p className="text-gray-500">
            Manage help articles, guides, and documentation.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3 hover:bg-gray-100"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onCreateArticle}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
          >
            <FiPlus />
            New Article
          </button>

        </div>

      </div>

      <div className="relative mb-6 max-w-md">

        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          className="w-full rounded-lg border py-2 pl-10 pr-4"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

      </div>

      <div className="space-y-4">

        {filtered.map((article) => (

          <div
            key={article.id}
            className="rounded-xl border p-5"
          >

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <h3 className="text-lg font-semibold">
                  {article.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  {article.summary}
                </p>

              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                {article.category}
              </span>

            </div>

            <div className="mt-5 flex flex-wrap gap-3">

              {article.tags.map((tag) => (

                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  <FiTag size={12} />
                  {tag}
                </span>

              ))}

            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

              <div className="flex gap-5 text-sm text-gray-500">

                <span className="flex items-center gap-2">
                  <FiEye />
                  {article.views}
                </span>

                <span className="flex items-center gap-2">
                  <FiThumbsUp />
                  {article.helpful}
                </span>

                <span className="flex items-center gap-2">
                  <FiBookOpen />
                  Version {article.version}
                </span>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => onViewArticle?.(article)}
                  className="rounded-lg border px-4 py-2"
                >
                  View
                </button>

                <button
                  onClick={() => onEditArticle?.(article)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  <FiEdit2 />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
import { useMemo, useState } from "react";
import {
  FiBookOpen,
  FiSearch,
  FiEye,
  FiEdit2,
  FiPlus,
  FiGlobe,
  FiThumbsUp,
  FiBarChart2,
} from "react-icons/fi";

export default function KnowledgeBase({
  loading,
  articles = [],
  onCreate,
  onPreview,
  onEdit,
}) {
  const [search, setSearch] = useState("");

  const filteredArticles = useMemo(() => {
    if (!search.trim()) return articles;

    return articles.filter((article) =>
      [article.title, article.category, article.language]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [articles, search]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Knowledge Base</h2>
          <p className="text-gray-500">Help articles for customers and support agents.</p>
        </div>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Article
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            className="w-full rounded-lg border py-2 pl-10 pr-4"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <FiBookOpen size={22} />
              </div>
              <div>
                <h3 className="font-bold">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.category}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FiGlobe />
                  Language
                </span>
                <strong>{article.language}</strong>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FiBarChart2 />
                  Views
                </span>
                <strong>{article.views}</strong>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FiThumbsUp />
                  Helpful
                </span>
                <strong>{article.helpful}%</strong>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onPreview?.(article)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                <FiEye />
                Preview
              </button>
              <button
                onClick={() => onEdit?.(article)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <FiEdit2 />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
