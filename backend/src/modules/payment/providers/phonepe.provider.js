import PaymentProvider from "./payment.provider.js";

class PhonePeProvider extends PaymentProvider {
  async createTransaction({ amount, orderId, customerId }) {
    return {
      success: true,
      transactionId: `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      paymentUrl: "https://phonepe.com/checkout",
    };
  }

  async verifyTransaction(transactionId) {
    return {
      success: true,
      status: "SUCCESS",
    };
  }
}

export default new PhonePeProvider();
