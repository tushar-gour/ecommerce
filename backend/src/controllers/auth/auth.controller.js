import authService from "../../services/auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      res
        .status(201)
        .json(ApiResponse.created(result, "Registration successful"));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      res.json(ApiResponse.ok(result, "Login successful"));
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      res.json(ApiResponse.ok(user));
    } catch (error) {
      next(error);
    }
  }

  async getWishlist(req, res, next) {
    try {
      const wishlist = await authService.getWishlist(req.user.id);
      res.json(ApiResponse.ok(wishlist));
    } catch (error) {
      next(error);
    }
  }

  async addToWishlist(req, res, next) {
    try {
      const user = await authService.addToWishlist(
        req.user.id,
        req.params.productId,
      );
      res.json(ApiResponse.ok(user.wishlist, "Added to wishlist"));
    } catch (error) {
      next(error);
    }
  }

  async removeFromWishlist(req, res, next) {
    try {
      const user = await authService.removeFromWishlist(
        req.user.id,
        req.params.productId,
      );
      res.json(ApiResponse.ok(user.wishlist, "Removed from wishlist"));
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
