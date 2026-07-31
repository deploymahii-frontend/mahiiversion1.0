import useWallet from "../hooks/useWallet";
import useTransactions from "../hooks/useTransactions";
import WalletCard from "../components/WalletCard";
import CashbackCard from "../components/CashbackCard";
import RewardsCard from "../components/RewardsCard";
import TransactionList from "../components/TransactionList";
import RedeemRewards from "../components/RedeemRewards";

export default function WalletPage() {
  const { data: wallet = {}, isLoading: walletLoading } = useWallet();
  const { data: transactions = [], isLoading: txLoading } = useTransactions();

  const isLoading = walletLoading;

  // Map real API data into component props
  const walletData = {
    balance: wallet.balance ?? 0,
  };

  const cashbackData = {
    available: wallet.totalEarned
      ? Math.round(wallet.totalEarned * 0.05)
      : 0,
  };

  const rewardsData = {
    points: wallet.points ?? 0,
  };

  // Normalize transactions for display
  const normalizedTx = Array.isArray(transactions)
    ? transactions.map((tx) => ({
        id: tx._id || tx.id,
        title: tx.reason || tx.title || tx.description || "Wallet Activity",
        amount: Math.abs(tx.amount || tx.points || 0),
        type:
          tx.entryType === "BALANCE"
            ? tx.amount >= 0
              ? "credit"
              : "debit"
            : tx.type === "WITHDRAWAL"
            ? "debit"
            : "credit",
        date: tx.createdAt
          ? new Date(tx.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Recent",
      }))
    : [];

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Mahii Wallet & Rewards
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Manage your balance, cashback, and reward points
        </p>
      </div>

      {/* Balance Card */}
      <WalletCard wallet={walletData} />

      {/* Cashback & Rewards */}
      <div className="grid md:grid-cols-2 gap-6">
        <CashbackCard cashback={cashbackData} />
        <RewardsCard rewards={rewardsData} />
      </div>

      {/* Redeem Vouchers */}
      <RedeemRewards points={rewardsData.points} />

      {/* Transaction History */}
      <TransactionList transactions={normalizedTx} isLoading={txLoading} />
    </div>
  );
}
