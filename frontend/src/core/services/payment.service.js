import apiService from "./api.service.js";

class PaymentApiService {
  getKey() {
    return apiService.get("/payment/key");
  }

  createOrder(amount) {
    return apiService.post("/payment/create-order", { amount });
  }

  verifyAndCreateOrder(paymentData) {
    return apiService.post("/payment/verify", paymentData);
  }
}

export default new PaymentApiService();
