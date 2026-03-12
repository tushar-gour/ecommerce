import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import Footer from "../../components/layout/footer.jsx";
import useCart from "../../../core/hooks/useCart.js";
import useAuth from "../../../core/hooks/useAuth.js";

const CartPage = () => {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-page-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Add some products to get started
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white
              font-medium rounded-2xl hover:bg-primary-hover transition-all shadow-soft"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const image = item.images?.[0] || item.image;
              return (
                <div
                  key={item._id}
                  className="flex gap-4 bg-white rounded-2xl border border-border/50 p-4 shadow-soft"
                >
                  <Link to={`/product/${item._id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-card-bg rounded-xl overflow-hidden">
                      <img
                        src={image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-sm font-semibold text-gray-800 hover:text-primary line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.category}
                    </p>
                    <p className="text-base font-bold text-gray-800 mt-2">
                      ₹{item.price?.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="p-1.5 text-gray-600 hover:bg-card-bg transition-colors
                          disabled:opacity-30"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="p-1.5 text-gray-600 hover:bg-card-bg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-soft sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    {totalPrice >= 50 ? "Free" : "₹49"}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold text-gray-800 text-base">
                  <span>Total</span>
                  <span>
                    ₹{(totalPrice + (totalPrice >= 50 ? 0 : 49)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5
                  bg-primary text-white font-medium rounded-2xl hover:bg-primary-hover
                  transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]
                  shadow-soft"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/products"
                className="block text-center text-sm text-primary hover:underline mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
