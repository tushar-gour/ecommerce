import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import authApiService from "../../../core/services/auth.service.js";
import useAuthStore from "../../../core/store/auth.store.js";
import useCart from "../../../core/hooks/useCart.js";

const WishlistPage = () => {
  const { user } = useAuthStore();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetch = async () => {
      try {
        const response = await authApiService.getWishlist();
        setProducts(response.data || []);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user, navigate]);

  const handleRemove = async (productId) => {
    setRemoving(productId);
    try {
      await authApiService.removeFromWishlist(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch {
    } finally {
      setRemoving(null);
    }
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-border/50 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
        <div className="h-8 w-full bg-gray-200 rounded-xl" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
          My Wishlist
        </h1>

        {loading ?
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        : products.length === 0 ?
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-card-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-icon" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Save items you love for later.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white
                font-medium rounded-2xl hover:bg-primary-hover transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-border/50 overflow-hidden
                  shadow-soft hover:shadow-card transition-all duration-300 group"
              >
                <Link to={`/product/${product._id}`} className="block">
                  <div className="h-48 bg-card-bg p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.images?.[0] || product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {product.category}
                  </p>
                  <p className="text-base font-bold text-gray-800 mt-2">
                    ₹{product.price.toFixed(2)}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2 px-3 bg-primary text-white text-xs font-medium
                        rounded-xl hover:bg-primary-hover transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(product._id)}
                      disabled={removing === product._id}
                      className="p-2 border border-border rounded-xl text-red-400
                        hover:bg-red-50 hover:text-red-600 transition-all duration-300
                        disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default WishlistPage;
