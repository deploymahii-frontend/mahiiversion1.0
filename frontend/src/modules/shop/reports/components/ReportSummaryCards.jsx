export default function ReportSummaryCards({

    report,

}) {

    return (

        <div className="grid lg:grid-cols-4 gap-6">

            <div className="bg-blue-600 text-white p-6 rounded-xl">

                <h3>Total Sales</h3>

                <h1 className="text-3xl font-bold">

                    ₹{report.totalSales}

                </h1>

            </div>

            <div className="bg-green-600 text-white p-6 rounded-xl">

                <h3>Total Orders</h3>

                <h1 className="text-3xl font-bold">

                    {report.totalOrders}

                </h1>

            </div>

            <div className="bg-purple-600 text-white p-6 rounded-xl">

                <h3>Profit</h3>

                <h1 className="text-3xl font-bold">

                    ₹{report.profit}

                </h1>

            </div>

            <div className="bg-red-600 text-white p-6 rounded-xl">

                <h3>GST</h3>

                <h1 className="text-3xl font-bold">

                    ₹{report.tax}

                </h1>

            </div>

        </div>

    );

}
