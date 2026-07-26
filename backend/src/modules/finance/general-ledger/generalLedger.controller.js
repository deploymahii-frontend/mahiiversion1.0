import * as generalLedgerService from "./generalLedger.service.js";

/*
|--------------------------------------------------------------------------
| Post Journal To General Ledger
|--------------------------------------------------------------------------
*/

export async function postJournal(req, res, next) {

    try {

        const result =
            await generalLedgerService.postJournalToLedger(

                req.params.journalId

            );

        return res.status(201).json({

            success: true,

            message: "Journal posted successfully.",

            data: result

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Ledger Details
|--------------------------------------------------------------------------
*/

export async function getLedger(req, res, next) {

    try {

        const ledger =
            await generalLedgerService.getLedger(

                req.params.id

            );

        return res.status(200).json({

            success: true,

            data: ledger

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Account Statement
|--------------------------------------------------------------------------
*/

export async function getAccountLedger(req, res, next) {

    try {

        const ledger =
            await generalLedgerService.getAccountLedger(

                req.params.accountId

            );

        return res.status(200).json({

            success: true,

            data: ledger

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Ledger List
|--------------------------------------------------------------------------
*/

export async function getLedgerList(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const ledgers =
            await generalLedgerService.getLedgerList(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: ledgers

        });

    } catch (error) {

        next(error);

    }

}
