import orderRepository from "../repositories/order.repository.js";
import productRepository from "../repositories/product.repository.js";
import ProductModel from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

class OrderService {
  async create(userId, orderData) {
    const populatedItems = await Promise.all(
      orderData.items.map(async (item) => {
        const product = await ProductModel.findById(item.product);
        if (!product)
          throw ApiError.badRequest(`Product not found: ${item.product}`);
        if (product.stock < item.quantity) {
          throw ApiError.badRequest(`Insufficient stock for ${product.name}`);
        }
        product.stock -= item.quantity;
        await product.save();
        return {
          product: product._id,
          vendor: product.vendor,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images?.[0] || "",
        };
      }),
    );

    const totalAmount = populatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return orderRepository.create({
      user: userId,
      items: populatedItems,
      totalAmount,
      shippingAddress: orderData.shippingAddress,
      ...(orderData.paymentId && { paymentId: orderData.paymentId }),
    });
  }

  async getUserOrders(userId) {
    return orderRepository.findByUser(userId);
  }

  async getById(id, userId, role) {
    const order = await orderRepository.findById(id);
    if (!order) throw ApiError.notFound("Order not found");
    if (
      role !== "admin" &&
      role !== "vendor" &&
      order.user.toString() !== userId
    ) {
      throw ApiError.forbidden("Access denied");
    }
    return order;
  }

  async getAll() {
    return orderRepository.findAll();
  }

  async updateStatus(id, status) {
    const order = await orderRepository.updateStatus(id, status);
    if (!order) throw ApiError.notFound("Order not found");
    return order;
  }

  async getVendorOrders(vendorId) {
    return orderRepository.findByVendor(vendorId);
  }

  async getVendorStats(vendorId) {
    const stats = await orderRepository.getVendorStats(vendorId);
    const productCount = await productRepository.countByVendor(vendorId);
    return { ...stats, productCount };
  }
}

export default new OrderService();
