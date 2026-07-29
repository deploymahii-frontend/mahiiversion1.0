import * as journalService from "./journal.service.js";

/*
|--------------------------------------------------------------------------
| Create Journal
|--------------------------------------------------------------------------
*/

export async function createJournal(req, res, next) {

    try {

        const journal =
            await journalService.createJournal({

                ...req.body,

                postedBy: req.user._id

            });

        return res.status(201).json({

            success: true,

            message: "Journal created successfully.",

            data: journal

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Journal
|--------------------------------------------------------------------------
*/

export async function updateJournal(req, res, next) {

    try {

        const journal =
            await journalService.updateJournal(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Journal updated successfully.",

            data: journal

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Journal
|--------------------------------------------------------------------------
*/

export async function deleteJournal(req, res, next) {

    try {

        await journalService.deleteJournal(

            req.params.id

        );

        return res.status(200).json({

            success: true,

            message: "Journal deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Journal Details
|--------------------------------------------------------------------------
*/

export async function getJournal(req, res, next) {

    try {

        const journal =
            await journalService.getJournal(

                req.params.id

            );

        return res.status(200).json({

            success: true,

            data: journal

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Journal List
|--------------------------------------------------------------------------
*/

export async function getJournals(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const journals =
            await journalService.getJournals(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: journals

        });

    } catch (error) {

        next(error);

    }

}
