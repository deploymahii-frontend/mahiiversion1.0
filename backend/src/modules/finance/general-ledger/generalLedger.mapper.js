export function toGeneralLedgerResponse(entry) {

    if (!entry) {
        return null;
    }

    return {

        id: entry._id,

        account: entry.account,

        journal: entry.journal,

        journalLine: entry.journalLine,

        transactionDate: entry.transactionDate,

        referenceType: entry.referenceType,

        referenceId: entry.referenceId,

        description: entry.description,

        debit: entry.debit,

        credit: entry.credit,

        runningBalance: entry.runningBalance,

        createdAt: entry.createdAt,

        updatedAt: entry.updatedAt

    };

}
