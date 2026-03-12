import cartService from "../../services/cart.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class CartController {
  async getCart(req, res, next) {
    try {
      const cart = await cartService.getCart(req.user.id);
      res.json(ApiResponse.ok(cart));
    } catch (error) {
      next(error);
    }
  }

  async addItem(req, res, next) {
    try {
      const cart = await cartService.addItem(
        req.user.id,
        req.body.productId,
        req.body.quantity,
      );
      res.json(ApiResponse.ok(cart, "Item added to cart"));
    } catch (error) {
      next(error);
    }
  }

  async updateQuantity(req, res, next) {
    try {
      const cart = await cartService.updateQuantity(
        req.user.id,
        req.params.productId,
        req.body.quantity,
      );
      res.json(ApiResponse.ok(cart, "Cart updated"));
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req, res, next) {
    try {
      const cart = await cartService.removeItem(
        req.user.id,
        req.params.productId,
      );
      res.json(ApiResponse.ok(cart, "Item removed from cart"));
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req, res, next) {
    try {
      const cart = await cartService.clearCart(req.user.id);
      res.json(ApiResponse.ok(cart, "Cart cleared"));
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
