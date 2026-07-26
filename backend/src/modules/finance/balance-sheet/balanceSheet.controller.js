import * as balanceSheetService from "./balanceSheet.service.js";

export async function getBalanceSheet(
    req,
    res,
    next
) {

    try {

        const asOfDate =
            req.query.asOfDate ||
            new Date();

        const report =
            await balanceSheetService.generateBalanceSheet(

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
