import PaymentProvider from "./payment.provider.js";

class PhonePeProvider extends PaymentProvider {
  async createTransaction({ amount, orderId, customerId }) {
    // Stub implementation for PhonePe integration
    return {
      success: true,
      transactionId: `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      paymentUrl: "https://phonepe.com/mock-checkout",
    };
  }

  async verifyTransaction(transactionId) {
    // Stub implementation for Verification
    return {
      success: true,
      status: "SUCCESS",
    };
  }
}

export default new PhonePeProvider();
