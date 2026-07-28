import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FiCreditCard, FiArrowUpRight, FiArrowDownLeft, FiClock } from "react-icons/fi";
import { getWallet, getTransactions } from "../services/wallet.service";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [walletRes, txRes] = await Promise.all([
        getWallet(),
        getTransactions(1, 20)
      ]);
      
      if (walletRes.data?.data) {
        setWallet(walletRes.data.data);
      }
      
      if (txRes.data?.data?.docs) {
        setTransactions(txRes.data.data.docs);
      } else if (Array.isArray(txRes.data?.data)) {
        setTransactions(txRes.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch wallet data", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center dark:text-slate-200">Loading Wallet...</div>;
  }

  return (
    <>
      <Helmet>
        <title>My Wallet | Mahii</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mahii Wallet</h1>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <FiCreditCard size={120} />
          </div>
          
          <div className="relative z-10">
            <p className="text-orange-100 font-medium mb-1">Available Balance</p>
            <h2 className="text-5xl font-black mb-6">₹{wallet?.balance?.toFixed(2) || "0.00"}</h2>
            
            <div className="flex gap-4">
              <button className="bg-white text-orange-600 px-6 py-2.5 rounded-xl font-bold hover:bg-orange-50 transition shadow-sm">
                Add Money
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Ledger */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Transactions</h3>
          
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-10 text-gray-500 dark:text-slate-400">
                <FiClock className="mx-auto h-12 w-12 mb-3 opacity-20" />
                <p>No transactions yet.</p>
              </div>
            ) : (
              transactions.map((tx) => (
                <div key={tx._id || tx.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-950/50 border border-transparent dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      tx.type === "CREDIT" 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {tx.type === "CREDIT" ? <FiArrowDownLeft size={20} /> : <FiArrowUpRight size={20} />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{tx.description || tx.type}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {new Date(tx.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`font-bold ${
                    tx.type === "CREDIT" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-gray-900 dark:text-white"
                  }`}>
                    {tx.type === "CREDIT" ? "+" : "-"}₹{tx.amount?.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
