import useReports from "../hooks/useReports";

import ReportSummaryCards from "../components/ReportSummaryCards";

export default function ReportsDashboard() {

    const {

        report,

        loading,

    } = useReports();

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8 space-y-8">

            <h1 className="text-3xl font-bold">

                Business Reports

            </h1>

            <ReportSummaryCards

                report={report}

            />

        </div>

    );

}
