import Razorpay from "razorpay";
import crypto from "crypto";
import env from "../../config/env.js";
import orderService from "../../services/order.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

const hasRazorpayConfig = () =>
  Boolean(env.razorpayKeyId && env.razorpayKeySecret);

const getRazorpayClient = () => {
  if (!hasRazorpayConfig()) {
    throw ApiError.internal("Payment gateway is not configured");
  }
  return new Razorpay({
    key_id: env.razorpayKeyId,
    key_secret: env.razorpayKeySecret,
  });
};

const normalizePaymentError = (error) => {
  if (error instanceof ApiError) return error;
  const message =
    error?.error?.description ||
    error?.description ||
    error?.message ||
    "Payment service is unavailable";
  return ApiError.internal(message);
};

class PaymentController {
  async createOrder(req, res, next) {
    try {
      const { amount } = req.body;
      if (!amount || amount <= 0) {
        throw ApiError.badRequest("Invalid amount");
      }

      const razorpay = getRazorpayClient();

      const options = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `order_${Date.now()}`,
      };

      const razorpayOrder = await razorpay.orders.create(options);

      res.json(
        ApiResponse.ok({
          orderId: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          keyId: env.razorpayKeyId,
        }),
      );
    } catch (error) {
      next(normalizePaymentError(error));
    }
  }

  async verifyAndCreateOrder(req, res, next) {
    try {
      if (!hasRazorpayConfig()) {
        throw ApiError.internal("Payment gateway is not configured");
      }
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderData,
      } = req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", env.razorpayKeySecret)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        throw ApiError.badRequest("Payment verification failed");
      }

      const order = await orderService.create(req.user.id, {
        ...orderData,
        paymentId: razorpay_payment_id,
      });

      res.status(201).json(ApiResponse.created(order));
    } catch (error) {
      next(normalizePaymentError(error));
    }
  }

  getKey(req, res) {
    if (!hasRazorpayConfig()) {
      throw ApiError.internal("Payment gateway is not configured");
    }
    res.json(ApiResponse.ok({ keyId: env.razorpayKeyId }));
  }
}

export default new PaymentController();
