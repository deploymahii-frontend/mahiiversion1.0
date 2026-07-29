import { useState } from "react";

const REPORT_TYPES = [
  "Revenue",
  "Orders",
  "Customers",
  "Shops",
  "Growth",
  "Complete Analytics",
];

const EXPORT_FORMATS = [
  {
    value: "pdf",
    label: "PDF",
    icon: "📄",
  },
  {
    value: "xlsx",
    label: "Excel",
    icon: "📊",
  },
  {
    value: "csv",
    label: "CSV",
    icon: "📑",
  },
];

export default function ExportReports({
  onExport,
}) {
  const [reportType, setReportType] =
    useState("Complete Analytics");

  const [format, setFormat] =
    useState("pdf");

  const [emailReport, setEmailReport] =
    useState(false);

  function handleExport() {
    if (onExport) {
      onExport({
        reportType,
        format,
        emailReport,
      });
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Export Reports
      </h2>

      <p className="mt-1 text-gray-500">
        Download or share analytics reports.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Report Type
          </label>

          <select
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
          >
            {REPORT_TYPES.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Export Format
          </label>

          <div className="grid grid-cols-3 gap-3">

            {EXPORT_FORMATS.map((item) => (

              <button
                key={item.value}
                onClick={() =>
                  setFormat(item.value)
                }
                className={`rounded-xl border p-4 text-center transition ${
                  format === item.value
                    ? "border-orange-500 bg-orange-50"
                    : ""
                }`}
              >
                <div className="text-3xl">
                  {item.icon}
                </div>

                <p className="mt-2 text-sm font-medium">
                  {item.label}
                </p>

              </button>

            ))}

          </div>

        </div>

      </div>

      <div className="mt-6 flex items-center gap-3">

        <input
          id="emailReport"
          type="checkbox"
          checked={emailReport}
          onChange={(e) =>
            setEmailReport(
              e.target.checked
            )
          }
        />

        <label htmlFor="emailReport">
          Email report after generation
        </label>

      </div>

      <div className="mt-8 flex flex-wrap gap-4">

        <button
          onClick={handleExport}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Export Report
        </button>

        <button
          className="rounded-xl border px-6 py-3 hover:bg-gray-100"
        >
          Schedule Export
        </button>

      </div>

    </div>
  );
}
