import generalLedgerRepository from "./generalLedger.repository.js";
import journalRepository from "../journal/journal.repository.js";

/*
|--------------------------------------------------------------------------
| Post Journal To Ledger
|--------------------------------------------------------------------------
*/

export async function postJournalToLedger(journalId) {

    const journal =
        await journalRepository.findById(
            journalId
        );

    if (!journal) {

        throw new Error(
            "Journal not found."
        );

    }

    if (journal.status !== "POSTED") {

        throw new Error(
            "Only POSTED journals can be transferred to General Ledger."
        );

    }

    const ledgerEntries = [];

    for (let i = 0; i < journal.lines.length; i++) {

        const line = journal.lines[i];

        const previousEntries =
            await generalLedgerRepository.findByAccount(
                line.account._id
            );

        let runningBalance = 0;

        if (previousEntries.length > 0) {

            runningBalance =
                previousEntries[
                    previousEntries.length - 1
                ].runningBalance;

        }

        runningBalance +=
            Number(line.debit || 0);

        runningBalance -=
            Number(line.credit || 0);

        ledgerEntries.push({

            account:
                line.account._id,

            journal:
                journal._id,

            journalLine:
                i + 1,

            transactionDate:
                journal.journalDate,

            referenceType:
                journal.referenceType,

            referenceId:
                journal.referenceId,

            description:
                journal.description,

            debit:
                line.debit,

            credit:
                line.credit,

            runningBalance

        });

    }

    return generalLedgerRepository.createMany(
        ledgerEntries
    );

}

/*
|--------------------------------------------------------------------------
| Ledger Details
|--------------------------------------------------------------------------
*/

export async function getLedger(id) {

    return generalLedgerRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Account Statement
|--------------------------------------------------------------------------
*/

export async function getAccountLedger(
    account
) {

    return generalLedgerRepository.findByAccount(
        account
    );

}

/*
|--------------------------------------------------------------------------
| Ledger List
|--------------------------------------------------------------------------
*/

export async function getLedgerList(
    page,
    limit
) {

    return generalLedgerRepository.paginate(
        {},
        page,
        limit
    );

}
