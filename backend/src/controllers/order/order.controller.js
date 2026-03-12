import orderService from "../../services/order.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class OrderController {
  async create(req, res, next) {
    try {
      const order = await orderService.create(req.user.id, req.body);
      res.status(201).json(ApiResponse.created(order));
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const orders = await orderService.getUserOrders(req.user.id);
      res.json(ApiResponse.ok(orders));
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const order = await orderService.getById(
        req.params.id,
        req.user.id,
        req.user.role,
      );
      res.json(ApiResponse.ok(order));
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const orders = await orderService.getAll();
      res.json(ApiResponse.ok(orders));
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const order = await orderService.updateStatus(
        req.params.id,
        req.body.status,
      );
      res.json(ApiResponse.ok(order, "Order status updated"));
    } catch (error) {
      next(error);
    }
  }

  async getVendorOrders(req, res, next) {
    try {
      const orders = await orderService.getVendorOrders(req.user.id);
      res.json(ApiResponse.ok(orders));
    } catch (error) {
      next(error);
    }
  }

  async getVendorStats(req, res, next) {
    try {
      const stats = await orderService.getVendorStats(req.user.id);
      res.json(ApiResponse.ok(stats));
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
