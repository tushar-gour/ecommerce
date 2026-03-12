import productService from "../../services/product.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class ProductController {
  async create(req, res, next) {
    try {
      const productData = { ...req.body, vendor: req.user.id };
      const product = await productService.create(productData);
      res.status(201).json(ApiResponse.created(product));
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await productService.getAll(req.query);
      res.json(ApiResponse.ok(products));
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const products = await productService.search(req.query.q);
      res.json(ApiResponse.ok(products));
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const product = await productService.getById(req.params.id);
      res.json(ApiResponse.ok(product));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.json(ApiResponse.ok(product, "Product updated"));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await productService.delete(req.params.id);
      res.json(ApiResponse.ok(null, "Product deleted"));
    } catch (error) {
      next(error);
    }
  }

  async getFeatured(req, res, next) {
    try {
      const products = await productService.getFeatured();
      res.json(ApiResponse.ok(products));
    } catch (error) {
      next(error);
    }
  }

  async getBestSellers(req, res, next) {
    try {
      const products = await productService.getBestSellers();
      res.json(ApiResponse.ok(products));
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await productService.getCategories();
      res.json(ApiResponse.ok(categories));
    } catch (error) {
      next(error);
    }
  }

  async getVendorProducts(req, res, next) {
    try {
      const products = await productService.getByVendor(req.user.id);
      res.json(ApiResponse.ok(products));
    } catch (error) {
      next(error);
    }
  }

  async vendorUpdate(req, res, next) {
    try {
      const product = await productService.vendorUpdate(
        req.params.id,
        req.user.id,
        req.body,
      );
      res.json(ApiResponse.ok(product, "Product updated"));
    } catch (error) {
      next(error);
    }
  }

  async vendorDelete(req, res, next) {
    try {
      await productService.vendorDelete(req.params.id, req.user.id);
      res.json(ApiResponse.ok(null, "Product deleted"));
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
