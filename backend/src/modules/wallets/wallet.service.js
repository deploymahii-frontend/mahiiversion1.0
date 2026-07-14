import * as repository from "./wallet.repository.js";
import {
  WALLET_ENTRY_TYPE,
  WALLET_TRANSACTION_TYPE,
} from "./wallet.constants.js";

export async function ensureWallet(userId) {
  let wallet = await repository.findWalletByUser(userId);

  if (!wallet) {
    wallet = await repository.createWallet({
      user: userId,
      points: 0,
      balance: 0,
      totalEarned: 0,
      totalSpent: 0,
    });
  }

  return wallet;
}

export async function getWallet(userId) {
  const wallet = await ensureWallet(userId);

  return {
    points: wallet.points,
    balance: wallet.balance,
    totalEarned: wallet.totalEarned,
    totalSpent: wallet.totalSpent,
  };
}

export async function getTransactions(userId) {
  await ensureWallet(userId);
  return repository.findTransactionsByUser(userId);
}

export async function addReward(userId, rewardData) {
  const wallet = await ensureWallet(rewardData.user);

  const transaction = {
    wallet: wallet._id,
    user: rewardData.user,
    type: rewardData.type || WALLET_TRANSACTION_TYPE.CREATOR_REWARD,
    entryType: rewardData.entryType,
    amount: Number(rewardData.amount || 0),
    points: Number(rewardData.points || 0),
    reason: rewardData.reason,
    metadata: rewardData.metadata || {},
    createdBy: userId,
  };

  const updates = {};

  if (transaction.entryType === WALLET_ENTRY_TYPE.BALANCE) {
    updates.balance = wallet.balance + transaction.amount;
    updates.totalEarned = wallet.totalEarned + transaction.amount;
  }

  if (transaction.entryType === WALLET_ENTRY_TYPE.POINTS) {
    updates.points = wallet.points + transaction.points;
  }

  const updatedWallet = await repository.updateWallet(rewardData.user, {
    ...updates,
  });

  await repository.createTransaction(transaction);

  return {
    wallet: updatedWallet,
    transaction,
  };
}
