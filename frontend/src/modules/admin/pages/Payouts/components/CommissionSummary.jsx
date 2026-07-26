export default function CommissionSummary({

    summary

}){

    return(

        <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow">

                <h3>Platform Revenue</h3>

                <p className="mt-2 text-3xl font-bold">

                    ₹{summary.platformRevenue}

                </p>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow">

                <h3>Pending Payout</h3>

                <p className="mt-2 text-3xl font-bold">

                    ₹{summary.pendingPayout}

                </p>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow">

                <h3>Completed Payout</h3>

                <p className="mt-2 text-3xl font-bold">

                    ₹{summary.completedPayout}

                </p>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow">

                <h3>Commission Rate</h3>

                <p className="mt-2 text-3xl font-bold">

                    {summary.commissionRate}%

                </p>

            </div>

        </div>

    )

}
