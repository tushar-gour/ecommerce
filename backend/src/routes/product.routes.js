import { Router } from "express";
import productController from "../controllers/product/product.controller.js";
import {
  authenticate,
  authorizeAdmin,
  authorizeVendor,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", (req, res, next) => productController.getAll(req, res, next));
router.get("/search", (req, res, next) =>
  productController.search(req, res, next),
);
router.get("/featured", (req, res, next) =>
  productController.getFeatured(req, res, next),
);
router.get("/bestsellers", (req, res, next) =>
  productController.getBestSellers(req, res, next),
);
router.get("/categories", (req, res, next) =>
  productController.getCategories(req, res, next),
);

router.get(
  "/vendor/my-products",
  authenticate,
  authorizeVendor,
  (req, res, next) => productController.getVendorProducts(req, res, next),
);
router.post("/", authenticate, authorizeVendor, (req, res, next) =>
  productController.create(req, res, next),
);
router.put("/vendor/:id", authenticate, authorizeVendor, (req, res, next) =>
  productController.vendorUpdate(req, res, next),
);
router.delete("/vendor/:id", authenticate, authorizeVendor, (req, res, next) =>
  productController.vendorDelete(req, res, next),
);

router.get("/:id", (req, res, next) =>
  productController.getById(req, res, next),
);

router.put("/:id", authenticate, authorizeAdmin, (req, res, next) =>
  productController.update(req, res, next),
);
router.delete("/:id", authenticate, authorizeAdmin, (req, res, next) =>
  productController.delete(req, res, next),
);

export default router;
