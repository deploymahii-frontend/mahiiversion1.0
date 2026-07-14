import Wallet from "./wallet.model.js";
import { WalletTransaction } from "./wallet.model.js";

export const findWalletByUser = (userId) =>
  Wallet.findOne({ user: userId });

export const createWallet = (data) => Wallet.create(data);

export const updateWallet = (userId, data) =>
  Wallet.findOneAndUpdate({ user: userId }, data, {
    new: true,
    runValidators: true,
  });

export const createTransaction = (data) => WalletTransaction.create(data);

export const findTransactionsByUser = (userId) =>
  WalletTransaction.find({ user: userId }).sort({ createdAt: -1 });
