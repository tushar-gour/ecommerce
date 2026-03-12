import { Router } from "express";
import cartController from "../controllers/cart/cart.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, (req, res, next) =>
  cartController.getCart(req, res, next),
);
router.post("/", authenticate, (req, res, next) =>
  cartController.addItem(req, res, next),
);
router.put("/:productId", authenticate, (req, res, next) =>
  cartController.updateQuantity(req, res, next),
);
router.delete("/:productId", authenticate, (req, res, next) =>
  cartController.removeItem(req, res, next),
);
router.delete("/", authenticate, (req, res, next) =>
  cartController.clearCart(req, res, next),
);

export default router;
