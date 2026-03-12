import OrderModel from "../models/order.model.js";

class OrderRepository {
  async create(orderData) {
    return OrderModel.create(orderData);
  }

  async findByUser(userId) {
    return OrderModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product", "name images price");
  }

  async findById(id) {
    return OrderModel.findById(id).populate(
      "items.product",
      "name images price",
    );
  }

  async findAll() {
    return OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.product", "name images price");
  }

  async updateStatus(id, status) {
    return OrderModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async findByVendor(vendorId) {
    return OrderModel.find({ "items.vendor": vendorId })
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.product", "name images price");
  }

  async getVendorStats(vendorId) {
    const orders = await OrderModel.find({ "items.vendor": vendorId });
    let totalRevenue = 0;
    let totalOrders = orders.length;
    let totalItems = 0;
    for (const order of orders) {
      for (const item of order.items) {
        if (item.vendor.toString() === vendorId) {
          totalRevenue += item.price * item.quantity;
          totalItems += item.quantity;
        }
      }
    }
    return { totalRevenue, totalOrders, totalItems };
  }
}

export default new OrderRepository();
