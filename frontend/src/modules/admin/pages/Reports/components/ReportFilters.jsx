export default function ReportFilters({
    filters,
    setFilters
}){
    return(
        <section className="mb-6">
            <input placeholder="Search" className="mr-2" onChange={(e)=>setFilters(f=>({ ...f, q: e.target.value }))} />
            <select onChange={(e)=>setFilters(f=>({...f, type: e.target.value}))}>
                <option value="">All</option>
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
            </select>
        </section>
    )
}
