import apiService from "./api.service.js";

class OrderApiService {
  create(data) {
    return apiService.post("/orders", data);
  }

  getMyOrders() {
    return apiService.get("/orders/my-orders");
  }

  getById(id) {
    return apiService.get(`/orders/${id}`);
  }

  getVendorOrders() {
    return apiService.get("/orders/vendor/orders");
  }

  getVendorStats() {
    return apiService.get("/orders/vendor/stats");
  }
}

export default new OrderApiService();
