import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Plus,
  Clock,
  CheckCircle,
  Truck,
  Ban,
} from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import orderApiService from "../../../core/services/order.service.js";
import useAuthStore from "../../../core/store/auth.store.js";

const statusConfig = {
  pending: { icon: Clock, color: "text-amber-600 bg-amber-50" },
  processing: { icon: Package, color: "text-blue-600 bg-blue-50" },
  shipped: { icon: Truck, color: "text-violet-600 bg-violet-50" },
  delivered: { icon: CheckCircle, color: "text-green-600 bg-green-50" },
  cancelled: { icon: Ban, color: "text-red-600 bg-red-50" },
};

const VendorDashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalItemsSold: 0,
  });
  const [orders, setOrders] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      navigate("/vendor/auth");
      return;
    }
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          orderApiService.getVendorStats(),
          orderApiService.getVendorOrders(),
        ]);
        setStats(
          statsRes.data || {
            totalRevenue: 0,
            totalOrders: 0,
            totalItemsSold: 0,
            productCount: 0,
          },
        );
        setOrders((ordersRes.data || []).slice(0, 5));
        setProductCount(statsRes.data?.productCount || 0);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate]);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-2xl border border-border/50 p-5 shadow-soft">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {user?.storeName || "Store"} Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your store and track performance
            </p>
          </div>
          <Link
            to="/vendor/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white
              text-sm font-medium rounded-2xl hover:bg-primary-hover transition-all duration-300 shadow-soft"
          >
            <Plus className="w-4 h-4" /> Manage Products
          </Link>
        </div>

        {loading ?
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border/50 p-5 animate-pulse"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-xl mb-3" />
                <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        : <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={DollarSign}
                label="Total Revenue"
                value={`₹${stats.totalRevenue.toFixed(2)}`}
                color="text-green-600 bg-green-50"
              />
              <StatCard
                icon={ShoppingCart}
                label="Total Orders"
                value={stats.totalOrders}
                color="text-blue-600 bg-blue-50"
              />
              <StatCard
                icon={TrendingUp}
                label="Items Sold"
                value={stats.totalItemsSold}
                color="text-violet-600 bg-violet-50"
              />
              <StatCard
                icon={Package}
                label="Products"
                value={productCount}
                color="text-amber-600 bg-amber-50"
              />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-border/50 shadow-soft">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    Recent Orders
                  </h2>
                </div>
              </div>

              {orders.length === 0 ?
                <div className="p-8 text-center text-sm text-gray-500">
                  No orders received yet
                </div>
              : <div className="divide-y divide-border">
                  {orders.map((order) => {
                    const sc =
                      statusConfig[order.status] || statusConfig.pending;
                    const StatusIcon = sc.icon;
                    return (
                      <div
                        key={order._id}
                        className="p-4 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800">
                            #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString()} -{" "}
                            {order.items.length} item
                            {order.items.length > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${sc.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {order.status}
                        </div>
                        <span className="text-sm font-bold text-gray-800 ml-auto">
                          ₹{order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              }
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default VendorDashboardPage;
