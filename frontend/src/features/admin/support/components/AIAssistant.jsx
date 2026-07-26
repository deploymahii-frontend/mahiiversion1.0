import {
  FiCpu,
  FiMessageCircle,
  FiFileText,
  FiBookOpen,
  FiGlobe,
  FiSmile,
  FiZap,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";

export default function AIAssistant({
  loading,
  summary = "",
  sentiment = {},
  replySuggestions = [],
  knowledgeSuggestions = [],
  translations = [],
  confidence = 0,
  onGenerateReplies,
  onSummarize,
  onTranslate,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <FiCpu size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                AI Assistant
              </h2>

              <p className="text-gray-500">
                Intelligent support copilot
              </p>
            </div>

          </div>

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3 hover:bg-gray-100"
          >
            <FiRefreshCw />
          </button>

        </div>

      </div>

      {/* Summary */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <FiFileText />

          <h3 className="text-lg font-semibold">
            Ticket Summary
          </h3>

        </div>

        <p className="text-gray-700">
          {summary}
        </p>

        <button
          onClick={onSummarize}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Regenerate Summary
        </button>

      </div>

      {/* Sentiment */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">

            <FiSmile />

            <h3 className="font-semibold">
              Sentiment Analysis
            </h3>

          </div>

          <div className="space-y-3">

            <Info
              label="Customer Mood"
              value={sentiment.label}
            />

            <Info
              label="Confidence"
              value={`${confidence}%`}
            />

            <Info
              label="Urgency"
              value={sentiment.urgency}
            />

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">

            <FiGlobe />

            <h3 className="font-semibold">
              Translation
            </h3>

          </div>

          <div className="space-y-3">

            {translations.map((item) => (

              <div
                key={item.language}
                className="rounded-lg border p-3"
              >

                <strong>{item.language}</strong>

                <p className="mt-2 text-gray-600">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

          <button
            onClick={onTranslate}
            className="mt-5 rounded-lg bg-green-600 px-4 py-2 text-white"
          >
            Translate
          </button>

        </div>

      </div>

      {/* Smart Replies */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <FiMessageCircle />

          <h3 className="text-lg font-semibold">
            Smart Reply Suggestions
          </h3>

        </div>

        <div className="space-y-3">

          {replySuggestions.map((reply) => (

            <div
              key={reply.id}
              className="rounded-xl border p-4"
            >

              {reply.message}

            </div>

          ))}

        </div>

        <button
          onClick={onGenerateReplies}
          className="mt-5 rounded-lg bg-purple-600 px-4 py-2 text-white"
        >
          Generate New Replies
        </button>

      </div>

      {/* Knowledge Suggestions */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <FiBookOpen />

          <h3 className="font-semibold">
            Recommended Knowledge Articles
          </h3>

        </div>

        <div className="space-y-3">

          {knowledgeSuggestions.map((article) => (

            <div
              key={article.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div>

                <strong>{article.title}</strong>

                <div className="text-sm text-gray-500">
                  {article.category}
                </div>

              </div>

              <FiCheckCircle className="text-green-600" />

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <span className="text-gray-500">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
// Placeholder for AIAssistant component
export default function AIAssistant() {
  return null;
}
