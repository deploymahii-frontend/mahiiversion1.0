import * as reportService from "../services/report.service";

export default function ExportButtons({

    filters,

}) {

    async function downloadPdf() {

        const response =
            await reportService.exportPdf(filters);

        const url =
            window.URL.createObjectURL(response.data);

        window.open(url);

    }

    async function downloadExcel() {

        const response =
            await reportService.exportExcel(filters);

        const url =
            window.URL.createObjectURL(response.data);

        window.open(url);

    }

    return (

        <div className="flex gap-4">

            <button

                onClick={downloadPdf}

                className="bg-red-600 text-white px-6 py-3 rounded-lg"

            >

                Export PDF

            </button>

            <button

                onClick={downloadExcel}

                className="bg-green-600 text-white px-6 py-3 rounded-lg"

            >

                Export Excel

            </button>

        </div>

    );

}
