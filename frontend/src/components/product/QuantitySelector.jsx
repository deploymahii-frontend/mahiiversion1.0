import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantitySelector({
    quantity,
    onIncrease,
    onDecrease,
}) {
    return (
        <div className="flex items-center gap-4">

            <button
                onClick={onDecrease}
                className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center"
            >
                <FiMinus />
            </button>

            <span className="text-xl font-bold">
                {quantity}
            </span>

            <button
                onClick={onIncrease}
                className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center"
            >
                <FiPlus />
            </button>

        </div>
    );
}
