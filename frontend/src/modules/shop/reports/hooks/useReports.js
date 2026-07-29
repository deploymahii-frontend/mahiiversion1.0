import { useEffect, useState } from "react";
import * as reportService from "../services/report.service";

export default function useReports(filters = {}) {

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    async function loadReport() {

        try {

            const { data } =
                await reportService.getDashboard(filters);

            setReport(data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadReport();

    }, [JSON.stringify(filters)]);

    return {

        report,

        loading,

        refresh: loadReport,

    };

}
