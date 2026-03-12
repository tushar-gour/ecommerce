import apiService from "./api.service.js";

class AuthApiService {
  register(data) {
    return apiService.post("/auth/register", data);
  }

  login(data) {
    return apiService.post("/auth/login", data);
  }

  getProfile() {
    return apiService.get("/auth/profile");
  }

  getWishlist() {
    return apiService.get("/auth/wishlist");
  }

  addToWishlist(productId) {
    return apiService.post(`/auth/wishlist/${productId}`);
  }

  removeFromWishlist(productId) {
    return apiService.delete(`/auth/wishlist/${productId}`);
  }
}

export default new AuthApiService();
