import GeneralLedger from "../general-ledger/generalLedger.model.js";
import ChartOfAccount from "../chart-of-accounts/coa.model.js";

export async function generateProfitLoss(
    fromDate,
    toDate
) {

    const ledger = await GeneralLedger.aggregate([

        {

            $match: {

                transactionDate: {

                    $gte: new Date(fromDate),

                    $lte: new Date(toDate)

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

    const revenue = [];

    const expenses = [];

    let totalRevenue = 0;

    let totalExpense = 0;

    for (const row of ledger) {

        const account =
            await ChartOfAccount.findById(
                row._id
            );

        if (!account) continue;

        if (account.type === "REVENUE") {

            const amount =
                row.credit - row.debit;

            totalRevenue += amount;

            revenue.push({

                code: account.code,

                name: account.name,

                amount

            });

        }

        if (account.type === "EXPENSE") {

            const amount =
                row.debit - row.credit;

            totalExpense += amount;

            expenses.push({

                code: account.code,

                name: account.name,

                amount

            });

        }

    }

    return {

        fromDate,

        toDate,

        revenue,

        expenses,

        totalRevenue,

        totalExpense,

        netProfit:
            totalRevenue - totalExpense

    };

}
