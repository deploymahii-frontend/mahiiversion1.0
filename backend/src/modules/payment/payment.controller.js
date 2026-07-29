import * as paymentService from "./payment.service.js";

export async function createOrder(req, res, next) {
  try {
    const order = await paymentService.createOrder(req.body);

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    next(error);
  }
}

export async function verify(req, res, next) {
  try {
    const result = await paymentService.verifyPayment(req.body);

    res.json({
      success: result.verified,
      verified: result.verified,
      data: result.order,
    });
  } catch (error) {
    next(error);
  }
}
