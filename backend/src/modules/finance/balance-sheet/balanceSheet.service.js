import GeneralLedger from "../general-ledger/generalLedger.model.js";
import ChartOfAccount from "../chart-of-accounts/coa.model.js";

export async function generateBalanceSheet(asOfDate) {

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

    const assets = [];

    const liabilities = [];

    const equity = [];

    let totalAssets = 0;

    let totalLiabilities = 0;

    let totalEquity = 0;

    for (const row of ledger) {

        const account =
            await ChartOfAccount.findById(
                row._id
            );

        if (!account) continue;

        if (account.type === "ASSET") {

            const balance =
                row.debit - row.credit;

            totalAssets += balance;

            assets.push({

                code: account.code,

                name: account.name,

                balance

            });

        }

        if (account.type === "LIABILITY") {

            const balance =
                row.credit - row.debit;

            totalLiabilities += balance;

            liabilities.push({

                code: account.code,

                name: account.name,

                balance

            });

        }

        if (account.type === "EQUITY") {

            const balance =
                row.credit - row.debit;

            totalEquity += balance;

            equity.push({

                code: account.code,

                name: account.name,

                balance

            });

        }

    }

    return {

        asOfDate,

        assets,

        liabilities,

        equity,

        totalAssets,

        totalLiabilities,

        totalEquity,

        balanced:
            totalAssets ===

            totalLiabilities +

            totalEquity

    };

}
