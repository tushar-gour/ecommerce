import { create } from "zustand";

const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart") || "[]"),

  addItem: (product) => {
    const items = get().items;
    const existing = items.find((item) => item._id === product._id);

    let updated;
    if (existing) {
      updated = items.map((item) =>
        item._id === product._id ?
          { ...item, quantity: item.quantity + 1 }
        : item,
      );
    } else {
      updated = [...items, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updated));
    set({ items: updated });
  },

  removeItem: (productId) => {
    const updated = get().items.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updated));
    set({ items: updated });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;
    const updated = get().items.map((item) =>
      item._id === productId ? { ...item, quantity } : item,
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    set({ items: updated });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },

  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get totalPrice() {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },
}));

export default useCartStore;
