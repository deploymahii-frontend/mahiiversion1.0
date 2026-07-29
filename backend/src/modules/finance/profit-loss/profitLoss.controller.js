import * as profitLossService from "./profitLoss.service.js";

export async function getProfitLoss(
    req,
    res,
    next
) {

    try {

        const fromDate =
            req.query.fromDate;

        const toDate =
            req.query.toDate;

        const report =
            await profitLossService.generateProfitLoss(

                fromDate,

                toDate

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
