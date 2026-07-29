import GeneralLedger from "../general-ledger/generalLedger.model.js";
import ChartOfAccount from "../chart-of-accounts/coa.model.js";

export async function generateTrialBalance(asOfDate = new Date()) {

    const ledger = await GeneralLedger.aggregate([

        {
            $match: {
                transactionDate: {
                    $lte: new Date(asOfDate)
                }
            }
        },

        {
            $group: {

                _id: "$account",

                debit: {
                    $sum: "$debit"
                },

                credit: {
                    $sum: "$credit"
                }

            }
        }

    ]);

    const result = [];

    let totalDebit = 0;

    let totalCredit = 0;

    for (const row of ledger) {

        const account =
            await ChartOfAccount.findById(
                row._id
            );

        if (!account) continue;

        totalDebit += row.debit;

        totalCredit += row.credit;

        result.push({

            accountId: account._id,

            code: account.code,

            name: account.name,

            type: account.type,

            debit: row.debit,

            credit: row.credit

        });

    }

    return {

        asOfDate,

        accounts: result,

        totalDebit,

        totalCredit,

        balanced:
            totalDebit === totalCredit

    };

}
