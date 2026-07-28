import React from "react";

export default function ShopDocumentsViewer({ documents = [] }) {

    if (!documents || documents.length === 0) return (
        <div className="p-4 text-gray-500">No documents available.</div>
    );

    return (
        <div className="grid grid-cols-2 gap-4">
            {documents.map((d, idx) => (
                <div key={idx} className="border rounded p-2">
                    <div className="font-medium">{d.type}</div>
                    <a href={d.url} target="_blank" rel="noreferrer" className="text-blue-600">Open</a>
                </div>
            ))}
        </div>
    );

}
