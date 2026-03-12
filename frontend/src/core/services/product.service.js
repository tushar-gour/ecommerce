import apiService from "./api.service.js";

class ProductApiService {
  getAll(params) {
    return apiService.get("/products", params);
  }

  getById(id) {
    return apiService.get(`/products/${id}`);
  }

  getFeatured() {
    return apiService.get("/products/featured");
  }

  getBestSellers() {
    return apiService.get("/products/bestsellers");
  }

  getCategories() {
    return apiService.get("/products/categories");
  }

  search(q) {
    return apiService.get("/products/search", { q });
  }

  getVendorProducts() {
    return apiService.get("/products/vendor/my-products");
  }

  createProduct(data) {
    return apiService.post("/products", data);
  }

  updateProduct(id, data) {
    return apiService.put(`/products/vendor/${id}`, data);
  }

  deleteProduct(id) {
    return apiService.delete(`/products/vendor/${id}`);
  }
}

export default new ProductApiService();
