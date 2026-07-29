export default function ReportsTable({
    reports=[]
}){
    return(
        <section className="mt-8 rounded-2xl bg-white p-6 shadow">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(r=>(
                        <tr key={r._id}>
                            <td>{r.type}</td>
                            <td>{r.value}</td>
                            <td>{r.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
