import useCartStore from "../store/cart.store.js";

export default function useCart() {
  const { items, addItem, removeItem, updateQuantity, clearCart } =
    useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
