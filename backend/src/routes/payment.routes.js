import { Router } from "express";
import paymentController from "../controllers/payment/payment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/key", authenticate, (req, res) =>
  paymentController.getKey(req, res),
);
router.post("/create-order", authenticate, (req, res, next) =>
  paymentController.createOrder(req, res, next),
);
router.post("/verify", authenticate, (req, res, next) =>
  paymentController.verifyAndCreateOrder(req, res, next),
);

export default router;
