import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import Footer from "../../components/layout/footer.jsx";
import productApiService from "../../../core/services/product.service.js";
import authApiService from "../../../core/services/auth.service.js";
import useCart from "../../../core/hooks/useCart.js";
import useAuth from "../../../core/hooks/useAuth.js";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await productApiService.getById(id);
        setProduct(response.data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      if (wishlisted) {
        await authApiService.removeFromWishlist(id);
      } else {
        await authApiService.addToWishlist(id);
      }
      setWishlisted(!wishlisted);
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-card-bg rounded-3xl" />
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-10 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-page-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Product not found
          </h2>
          <Link
            to="/products"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800
            transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-card-bg rounded-3xl overflow-hidden p-8">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === selectedImage ? "border-primary" : (
                        "border-border hover:border-gray-300"
                      )
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium text-icon uppercase tracking-widest mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
                {product.name}
              </h1>
            </div>

            {product.vendor && (
              <p className="text-sm text-gray-500">
                Sold by{" "}
                <span className="font-medium text-gray-700">
                  {product.vendor.storeName || product.vendor.name}
                </span>
              </p>
            )}

            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating) ?
                          "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {product.rating}
                </span>
                <span className="text-sm text-gray-400">
                  ({product.numReviews} reviews)
                </span>
              </div>
            )}

            <p className="text-3xl font-bold text-gray-800">
              ₹{product.price?.toFixed(2)}
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  product.stock > 0 ?
                    "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
                }`}
              >
                {product.stock > 0 ?
                  `In Stock (${product.stock})`
                : "Out of Stock"}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-gray-600 hover:bg-card-bg transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="px-4 py-3 text-gray-600 hover:bg-card-bg transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5
                    bg-primary text-white font-medium rounded-2xl hover:bg-primary-hover
                    transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]
                    shadow-soft"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>

                <button
                  onClick={handleWishlist}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                    wishlisted ?
                      "bg-red-50 border-red-200 text-red-500"
                    : "border-border text-gray-400 hover:bg-card-bg"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: Shield, label: "Secure Payment" },
                { icon: RotateCcw, label: "30-Day Returns" },
              ].map((perk) => (
                <div
                  key={perk.label}
                  className="flex flex-col items-center text-center p-3"
                >
                  <perk.icon className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs text-gray-500">{perk.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
