import { useState } from "react";

export default function StockEditor({
    stock,
    onSave,
}) {

    const [value, setValue] = useState(stock);

    return (

        <div className="flex items-center gap-2">

            <input
                type="number"
                value={value}
                onChange={(e) =>
                    setValue(Number(e.target.value))
                }
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={() => onSave(value)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
            >
                Save
            </button>

        </div>

    );

}
