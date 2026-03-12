import apiService from "./api.service.js";

class CartApiService {
  getCart() {
    return apiService.get("/cart");
  }

  addItem(productId, quantity = 1) {
    return apiService.post("/cart", { productId, quantity });
  }

  updateQuantity(productId, quantity) {
    return apiService.put(`/cart/${productId}`, { quantity });
  }

  removeItem(productId) {
    return apiService.delete(`/cart/${productId}`);
  }

  clearCart() {
    return apiService.delete("/cart");
  }
}

export default new CartApiService();
