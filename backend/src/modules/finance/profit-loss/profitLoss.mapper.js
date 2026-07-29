export function toProfitLossResponse(
    report
) {

    return {

        fromDate: report.fromDate,

        toDate: report.toDate,

        revenue: report.revenue,

        expenses: report.expenses,

        totalRevenue: report.totalRevenue,

        totalExpense: report.totalExpense,

        netProfit: report.netProfit

    };

}
