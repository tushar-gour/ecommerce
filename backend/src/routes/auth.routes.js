import { Router } from "express";
import authController from "../controllers/auth/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", (req, res, next) =>
  authController.register(req, res, next),
);
router.post("/login", (req, res, next) => authController.login(req, res, next));
router.get("/profile", authenticate, (req, res, next) =>
  authController.getProfile(req, res, next),
);

router.get("/wishlist", authenticate, (req, res, next) =>
  authController.getWishlist(req, res, next),
);
router.post("/wishlist/:productId", authenticate, (req, res, next) =>
  authController.addToWishlist(req, res, next),
);
router.delete("/wishlist/:productId", authenticate, (req, res, next) =>
  authController.removeFromWishlist(req, res, next),
);

export default router;
