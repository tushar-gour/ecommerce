import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
  Ban,
} from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import orderApiService from "../../../core/services/order.service.js";
import useAuthStore from "../../../core/store/auth.store.js";

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-amber-600 bg-amber-50 border-amber-100",
    label: "Pending",
  },
  processing: {
    icon: Package,
    color: "text-blue-600 bg-blue-50 border-blue-100",
    label: "Processing",
  },
  shipped: {
    icon: Truck,
    color: "text-violet-600 bg-violet-50 border-violet-100",
    label: "Shipped",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-green-600 bg-green-50 border-green-100",
    label: "Delivered",
  },
  cancelled: {
    icon: Ban,
    color: "text-red-600 bg-red-50 border-red-100",
    label: "Cancelled",
  },
};

const OrdersPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await orderApiService.getMyOrders();
        setOrders(response.data || []);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-border/50 p-5 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-14 h-14 bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
          My Orders
        </h1>

        {loading ?
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        : orders.length === 0 ?
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-card-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-icon" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Start shopping to see your orders here.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white
                font-medium rounded-2xl hover:bg-primary-hover transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        : <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border border-border/50 p-5 shadow-soft
                    hover:shadow-card transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs font-mono text-gray-500 mt-0.5">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      border text-xs font-medium ${status.color}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-card-bg rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={
                              item.product?.images?.[0] ||
                              item.product?.image ||
                              ""
                            }
                            alt={item.product?.name || "Product"}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-xs text-gray-400 pl-1">
                        +{order.items.length - 3} more item
                        {order.items.length - 3 > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm font-bold text-gray-800">
                      Total: ₹{order.totalAmount.toFixed(2)}
                    </span>
                    <Link
                      to={`/orders/${order._id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      View Details <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
};

export default OrdersPage;
