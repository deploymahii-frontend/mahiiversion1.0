import ReportFilters from "./components/ReportFilters";
import ReportCards from "./components/ReportCards";
import ReportsTable from "./components/ReportsTable";
import ExportButtons from "./components/ExportButtons";

import { useReports } from "./hooks/useReports";

export default function ReportsPage() {

    const {

        reports,

        summary,

        loading,

        filters,

        setFilters

    } = useReports();

    if (loading) return <div>Loading...</div>;

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <ReportFilters
                filters={filters}
                setFilters={setFilters}
            />

            <ReportCards
                summary={summary}
            />

            <ExportButtons />

            <ReportsTable
                reports={reports}
            />

        </main>

    );

}
