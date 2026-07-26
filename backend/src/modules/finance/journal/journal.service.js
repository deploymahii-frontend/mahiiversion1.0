import journalRepository from "./journal.repository.js";

/*
|--------------------------------------------------------------------------
| Create Journal Entry
|--------------------------------------------------------------------------
*/

export async function createJournal(data) {

    const exists =
        await journalRepository.findByJournalNumber(
            data.journalNumber
        );

    if (exists) {

        throw new Error(
            "Journal number already exists."
        );

    }

    let debit = 0;
    let credit = 0;

    for (const line of data.lines) {

        debit += Number(line.debit || 0);

        credit += Number(line.credit || 0);

    }

    if (debit <= 0 || credit <= 0) {

        throw new Error(
            "Journal entry must contain debit and credit."
        );

    }

    if (debit !== credit) {

        throw new Error(
            "Total debit must equal total credit."
        );

    }

    data.totalDebit = debit;

    data.totalCredit = credit;

    return journalRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

export async function getJournal(id) {

    return journalRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export async function getJournals(page, limit) {

    return journalRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export async function updateJournal(
    id,
    data
) {

    return journalRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export async function deleteJournal(
    id
) {

    return journalRepository.delete(id);

}
