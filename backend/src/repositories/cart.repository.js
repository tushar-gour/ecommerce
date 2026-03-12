import CartModel from "../models/cart.model.js";

class CartRepository {
  async findByUser(userId) {
    return CartModel.findOne({ user: userId }).populate(
      "items.product",
      "name images price stock",
    );
  }

  async addItem(userId, productId, quantity = 1) {
    let cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      cart = await CartModel.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const idx = cart.items.findIndex(
        (i) => i.product.toString() === productId,
      );
      if (idx > -1) {
        cart.items[idx].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }
    return cart.populate("items.product", "name images price stock");
  }

  async updateItemQuantity(userId, productId, quantity) {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return null;
    const idx = cart.items.findIndex((i) => i.product.toString() === productId);
    if (idx === -1) return null;
    cart.items[idx].quantity = quantity;
    await cart.save();
    return cart.populate("items.product", "name images price stock");
  }

  async removeItem(userId, productId) {
    const cart = await CartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true },
    );
    return cart?.populate("items.product", "name images price stock");
  }

  async clearCart(userId) {
    return CartModel.findOneAndUpdate(
      { user: userId },
      { items: [] },
      { new: true },
    );
  }
}

export default new CartRepository();
