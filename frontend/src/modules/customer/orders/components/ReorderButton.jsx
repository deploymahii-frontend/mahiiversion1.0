import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function ReorderButton({ orderId }) {
  const handleReorder = () => {
    toast.success("Items added to cart!");
  };

  return (
    <button
      onClick={handleReorder}
      className="w-full py-3 px-4 bg-blue-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
    >
      <RefreshCw size={18} />
      Reorder Items
    </button>
  );
}
