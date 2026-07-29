export function toBalanceSheetResponse(
    report
) {

    return {

        asOfDate: report.asOfDate,

        assets: report.assets,

        liabilities: report.liabilities,

        equity: report.equity,

        totalAssets: report.totalAssets,

        totalLiabilities: report.totalLiabilities,

        totalEquity: report.totalEquity,

        balanced: report.balanced

    };

}
