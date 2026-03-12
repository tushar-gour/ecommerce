import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, MapPin, ChevronLeft } from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import useCart from "../../../core/hooks/useCart.js";
import useAuthStore from "../../../core/store/auth.store.js";
import paymentApiService from "../../../core/services/payment.service.js";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const finalAmount = totalPrice + shipping;

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await paymentApiService.createOrder(finalAmount);
      const { orderId, keyId } = response.data;

      const options = {
        key: keyId,
        amount: Math.round(finalAmount * 100),
        currency: "INR",
        name: "Tushar Store",
        description: `Order of ${items.length} item${items.length > 1 ? "s" : ""}`,
        order_id: orderId,
        handler: async (paymentResponse) => {
          try {
            await paymentApiService.verifyAndCreateOrder({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              orderData: {
                items: items.map((item) => ({
                  product: item._id,
                  quantity: item.quantity,
                })),
                shippingAddress: address,
              },
            });
            clearCart();
            navigate("/orders");
          } catch (err) {
            setError(err.message || "Payment verification failed");
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
        },
        theme: {
          color: "#8586fa",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (resp) => {
        setError(resp.error?.description || "Payment failed");
        setLoading(false);
      });
      razorpay.open();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateAddress = (field) => (e) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-page-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Your cart is empty
          </h2>
          <Link
            to="/products"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-5">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Shipping Address
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={updateAddress("street")}
                      required
                      className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        City
                      </label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={updateAddress("city")}
                        required
                        className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                          focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        State
                      </label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={updateAddress("state")}
                        required
                        className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                          focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={address.zipCode}
                        onChange={updateAddress("zipCode")}
                        required
                        className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                          focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="12345"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Country
                      </label>
                      <input
                        type="text"
                        value={address.country}
                        onChange={updateAddress("country")}
                        required
                        className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                          focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-soft sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-card-bg rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.images?.[0] || item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-gray-800">
                        &#8377;{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>&#8377;{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold text-gray-800 text-base">
                    <span>Total</span>
                    <span>&#8377;{finalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5
                    bg-primary text-white font-medium rounded-2xl hover:bg-primary-hover
                    transition-all duration-300 shadow-soft disabled:opacity-60"
                >
                  {loading ?
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </span>
                  : <>
                      <CreditCard className="w-5 h-5" /> Pay &#8377;
                      {finalAmount.toFixed(2)}
                    </>
                  }
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
