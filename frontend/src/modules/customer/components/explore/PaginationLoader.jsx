export default function PaginationLoader() {
    return (
        <div className="flex justify-center py-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading more shops...</span>
            </div>
        </div>
    );
}
