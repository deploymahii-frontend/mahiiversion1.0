import * as trialBalanceService from "./trialBalance.service.js";

export async function getTrialBalance(
    req,
    res,
    next
) {

    try {

        const asOfDate =
            req.query.asOfDate || new Date();

        const report =
            await trialBalanceService.generateTrialBalance(

                asOfDate

            );

        return res.status(200).json({

            success: true,

            data: report

        });

    }

    catch (error) {

        next(error);

    }

}
