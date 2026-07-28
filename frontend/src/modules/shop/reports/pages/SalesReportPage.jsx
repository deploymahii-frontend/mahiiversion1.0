import { useState } from "react";

import useReports from "../hooks/useReports";

import ReportFilters from "../components/ReportFilters";

import SalesTable from "../components/SalesTable";

import ExportButtons from "../components/ExportButtons";

export default function SalesReportPage() {

    const [filters, setFilters] = useState({

        from: "",

        to: "",

        paymentMethod: "",

    });

    const {

        report,

        loading,

    } = useReports(filters);

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8 space-y-8">

            <h1 className="text-3xl font-bold">

                Sales Report

            </h1>

            <ReportFilters

                filters={filters}

                onChange={setFilters}

            />

            <ExportButtons

                filters={filters}

            />

            <SalesTable

                orders={report.orders}

            />

        </div>

    );

}
