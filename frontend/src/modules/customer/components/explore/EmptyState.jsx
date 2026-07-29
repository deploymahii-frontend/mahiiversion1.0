export default function EmptyState({ onClear }) {
    return (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Shops Found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
                We couldn't find any shops matching your current filters or search term.
            </p>
            {onClear && (
                <button
                    onClick={onClear}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
}
