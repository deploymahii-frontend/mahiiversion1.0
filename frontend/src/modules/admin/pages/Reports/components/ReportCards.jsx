export default function ReportCards({
    summary
}){
    return(
        <div className="grid gap-6 md:grid-cols-4">
            {Object.keys(summary).map(k=>(
                <div key={k} className="rounded-2xl bg-white p-6 shadow">
                    <h3 className="text-gray-500">{k}</h3>
                    <p className="mt-3 text-3xl font-bold">{summary[k]}</p>
                </div>
            ))}
        </div>
    )
}
