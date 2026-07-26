export function toJournalResponse(journal) {

    if (!journal) {
        return null;
    }

    return {

        id: journal._id,

        journalNumber: journal.journalNumber,

        journalDate: journal.journalDate,

        referenceType: journal.referenceType,

        referenceId: journal.referenceId,

        description: journal.description,

        totalDebit: journal.totalDebit,

        totalCredit: journal.totalCredit,

        status: journal.status,

        lines: journal.lines,

        postedBy: journal.postedBy,

        createdAt: journal.createdAt,

        updatedAt: journal.updatedAt

    };

}
