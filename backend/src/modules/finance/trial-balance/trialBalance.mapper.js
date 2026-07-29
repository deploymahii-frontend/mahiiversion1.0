export function toTrialBalanceResponse(
    report
) {

    return {

        asOfDate: report.asOfDate,

        totalDebit: report.totalDebit,

        totalCredit: report.totalCredit,

        balanced: report.balanced,

        accounts: report.accounts

    };

}
