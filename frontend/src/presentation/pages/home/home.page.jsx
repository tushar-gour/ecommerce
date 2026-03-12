import { ArrowRight, Truck, Shield, RotateCcw, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/navbar.jsx";
import Footer from "../../components/layout/footer.jsx";
import ProductCard from "../../components/products/product.card.jsx";
import CategoryCard from "../../components/products/category.card.jsx";
import FeaturedCarousel from "../../components/products/featured.carousel.jsx";
import useProducts from "../../../core/hooks/useProducts.js";

const CATEGORY_IMAGES = {
  Electronics:
    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80",
  Fashion:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
  Accessories:
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
  "Home & Living":
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
  Sports:
    "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&q=80",
  Beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
};

const DEMO_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Accessories",
  "Home & Living",
  "Sports",
  "Beauty",
];

const PERKS = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹500" },
  { icon: Shield, title: "Secure Payment", desc: "SSL encrypted checkout" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Star, title: "Quality Products", desc: "Trusted by customers" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { featured, bestSellers, categories } = useProducts();

  const displayFeatured = featured;
  const displayBestSellers = bestSellers;
  const displayCategories =
    categories.length > 0 ? categories : DEMO_CATEGORIES;

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Welcome to
                <br />
                <span className="text-primary">Tushar Store</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed">
                Find everything you need in one place. Great products, fair
                prices, and fast delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary
                    text-white font-medium rounded-2xl hover:bg-primary-hover transition-all
                    duration-300 shadow-soft"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white
                    text-gray-800 font-medium rounded-2xl border border-border hover:bg-card-bg
                    transition-all duration-300"
                >
                  Browse Products
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative bg-feature-card rounded-3xl p-12 shadow-soft">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
                  alt="Featured product"
                  className="w-full h-80 object-contain"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 rounded-2xl p-5 shadow-soft">
                  <p className="text-sm font-semibold text-gray-800">
                    New Arrivals
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Starting from ₹499
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="flex flex-col items-center text-center p-6 bg-card-bg rounded-2xl
                border border-border/50 hover:shadow-soft transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <perk.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800">
                {perk.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Shop by Category
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Find what you're looking for
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCategories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
            >
              <CategoryCard name={cat} image={CATEGORY_IMAGES[cat]} />
            </Link>
          ))}
        </div>
      </section>

      {displayFeatured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Featured Products
              </h2>
              <p className="text-sm text-gray-500 mt-2">Worth checking out</p>
            </div>
          </div>

          <FeaturedCarousel products={displayFeatured} />
        </section>
      )}

      {displayBestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Best Sellers
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Popular with our customers
              </p>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayBestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="relative bg-card-bg rounded-2xl p-10 md:p-16 text-center border border-border/50">
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Get Updates
            </h2>
            <p className="text-sm text-gray-500">
              Sign up for deals, new arrivals, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 bg-white border border-border rounded-xl
                  text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2
                  focus:ring-primary/30 focus:border-primary transition-all duration-300"
              />
              <button
                className="px-6 py-3.5 bg-primary text-white text-sm font-medium rounded-xl
                  hover:bg-primary-hover transition-all duration-300 shadow-soft whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
