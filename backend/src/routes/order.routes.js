import { Router } from "express";
import orderController from "../controllers/order/order.controller.js";
import {
  authenticate,
  authorizeAdmin,
  authorizeVendor,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, (req, res, next) =>
  orderController.create(req, res, next),
);
router.get("/my-orders", authenticate, (req, res, next) =>
  orderController.getUserOrders(req, res, next),
);

router.get("/vendor/orders", authenticate, authorizeVendor, (req, res, next) =>
  orderController.getVendorOrders(req, res, next),
);
router.get("/vendor/stats", authenticate, authorizeVendor, (req, res, next) =>
  orderController.getVendorStats(req, res, next),
);

router.get("/:id", authenticate, (req, res, next) =>
  orderController.getById(req, res, next),
);

router.get("/", authenticate, authorizeAdmin, (req, res, next) =>
  orderController.getAll(req, res, next),
);
router.patch("/:id/status", authenticate, authorizeAdmin, (req, res, next) =>
  orderController.updateStatus(req, res, next),
);

export default router;
