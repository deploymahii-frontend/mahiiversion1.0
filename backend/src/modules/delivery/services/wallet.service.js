import walletRepository from "../repositories/wallet.repository.js";
import transactionRepository from "../repositories/transaction.repository.js";

export function calculateEarnings({ distance, incentive = 0 }) {
  const base = 35;
  const perKm = 8;

  return base + distance * perKm + incentive;
}

class WalletService {
  async getWallet(partnerId) {
    return walletRepository.upsertWallet(partnerId, {});
  }

  async getEarnings(partnerId) {
    const wallet = await walletRepository.upsertWallet(partnerId, {});
    const transactions = await transactionRepository.findByPartner(partnerId);

    return {
      wallet,
      transactions,
    };
  }

  async creditWallet(partnerId, amount, assignmentId, orderId) {
    const updatedWallet = await walletRepository.upsertWallet(partnerId, {
      $inc: {
        availableBalance: amount,
        lifetimeEarnings: amount,
      },
    });

    await transactionRepository.create({
      deliveryPartner: partnerId,
      assignment: assignmentId,
      order: orderId,
      amount,
      type: "DELIVERY_EARNING",
      status: "COMPLETED",
    });

    return updatedWallet;
  }
}

export default new WalletService();
