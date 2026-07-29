import * as grnService from "./grn.service.js";

/*
|--------------------------------------------------------------------------
| Create GRN
|--------------------------------------------------------------------------
*/

export async function createGRN(req, res, next) {

    try {

        const grn = await grnService.createGRN({

            ...req.body,

            receivedBy: req.user._id

        });

        return res.status(201).json({

            success: true,

            message: "Goods Receipt Note created successfully.",

            data: grn

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Get GRN
|--------------------------------------------------------------------------
*/

export async function getGRN(req, res, next) {

    try {

        const grn = await grnService.getGRN(

            req.params.id

        );

        return res.status(200).json({

            success: true,

            data: grn

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| GRN List
|--------------------------------------------------------------------------
*/

export async function getGRNs(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const result =
            await grnService.getGRNs(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: result

        });

    } catch (error) {

        next(error);

    }

}
