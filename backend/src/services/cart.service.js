import cartRepository from "../repositories/cart.repository.js";
import productRepository from "../repositories/product.repository.js";
import ApiError from "../utils/ApiError.js";

class CartService {
  async getCart(userId) {
    const cart = await cartRepository.findByUser(userId);
    if (!cart) return { items: [] };
    return cart;
  }

  async addItem(userId, productId, quantity = 1) {
    const product = await productRepository.findById(productId);
    if (!product) throw ApiError.notFound("Product not found");
    if (product.stock < quantity)
      throw ApiError.badRequest("Insufficient stock");
    return cartRepository.addItem(userId, productId, quantity);
  }

  async updateQuantity(userId, productId, quantity) {
    if (quantity < 1) throw ApiError.badRequest("Quantity must be at least 1");
    const product = await productRepository.findById(productId);
    if (!product) throw ApiError.notFound("Product not found");
    if (product.stock < quantity)
      throw ApiError.badRequest("Insufficient stock");
    return cartRepository.updateItemQuantity(userId, productId, quantity);
  }

  async removeItem(userId, productId) {
    return cartRepository.removeItem(userId, productId);
  }

  async clearCart(userId) {
    return cartRepository.clearCart(userId);
  }
}

export default new CartService();
