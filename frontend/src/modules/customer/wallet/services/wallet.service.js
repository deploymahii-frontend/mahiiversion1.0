import api from "@/services/api";

const walletService = {
  getWallet() {
    return api.get("/wallet");
  },

  getTransactions(params = {}) {
    return api.get("/wallet/transactions", { params });
  },

  addMoney(amount) {
    return api.post("/wallet/reward", {
      amount,
      entryType: "BALANCE",
      type: "WALLET_TOPUP",
      reason: `Wallet top-up of ₹${amount}`,
    });
  },

  redeemRewards(points) {
    return api.post("/wallet/reward", {
      points,
      entryType: "POINTS",
      type: "CUSTOMER_REWARD",
      reason: `Redeemed ${points} reward points`,
    });
  },
};

export default walletService;
