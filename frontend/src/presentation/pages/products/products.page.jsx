import { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X, Star } from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import Footer from "../../components/layout/footer.jsx";
import ProductCard from "../../components/products/product.card.jsx";
import productApiService from "../../../core/services/product.service.js";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minRating: searchParams.get("minRating") || "",
    inStock: searchParams.get("inStock") || "",
    sort: searchParams.get("sort") || "newest",
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.q) params.q = filters.q;
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.minRating) params.minRating = filters.minRating;
      if (filters.inStock) params.inStock = filters.inStock;
      if (filters.sort) params.sort = filters.sort;

      let response;
      if (filters.q) {
        response = await productApiService.search(filters.q);
      } else {
        response = await productApiService.getAll(params);
      }
      setProducts(response.data || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    productApiService
      .getCategories()
      .then((res) => setCategories(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchProducts();
    const params = {};
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params[k] = v;
    });
    setSearchParams(params, { replace: true });
  }, [fetchProducts, filters, setSearchParams]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      q: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      inStock: "",
      sort: "newest",
    });
  };

  const hasActiveFilters =
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minRating ||
    filters.inStock;

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {filters.q ?
                `Results for "${filters.q}"`
              : filters.category || "All Products"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {products.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchProducts();
              }}
              className="flex-1 sm:flex-initial relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filters.q}
                onChange={(e) => updateFilter("q", e.target.value)}
                placeholder="Search products..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl
                  text-sm focus:outline-none"
              />
            </form>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`p-2.5 rounded-xl border transition-colors ${
                hasActiveFilters ?
                  "bg-primary text-white border-primary"
                : "bg-white border-border text-gray-600 hover:bg-card-bg"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {filtersOpen && (
          <div className="bg-white rounded-2xl border border-border p-6 mb-8 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="w-full px-3 py-2 bg-page-bg border border-border rounded-xl text-sm
                    focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Min Price
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                  placeholder="₹0"
                  className="w-full px-3 py-2 bg-page-bg border border-border rounded-xl text-sm
                    focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Max Price
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  placeholder="₹9999"
                  className="w-full px-3 py-2 bg-page-bg border border-border rounded-xl text-sm
                    focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Min Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => updateFilter("minRating", e.target.value)}
                  className="w-full px-3 py-2 bg-page-bg border border-border rounded-xl text-sm
                    focus:outline-none"
                >
                  <option value="">Any Rating</option>
                  {[4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r}+ Stars
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Availability
                </label>
                <select
                  value={filters.inStock}
                  onChange={(e) => updateFilter("inStock", e.target.value)}
                  className="w-full px-3 py-2 bg-page-bg border border-border rounded-xl text-sm
                    focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="true">In Stock</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/50">
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Sort By
              </label>
              <select
                value={filters.sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="px-3 py-2 bg-page-bg border border-border rounded-xl text-sm
                  focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        )}

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {filters.category}
                <button onClick={() => updateFilter("category", "")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                ₹{filters.minPrice || "0"} – ₹{filters.maxPrice || "∞"}
                <button
                  onClick={() => {
                    updateFilter("minPrice", "");
                    updateFilter("maxPrice", "");
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.minRating && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                <Star className="w-3 h-3" /> {filters.minRating}+
                <button onClick={() => updateFilter("minRating", "")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {loading ?
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-card-bg rounded-3xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-feature-card" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-5 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        : products.length === 0 ?
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">
              No products found
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        }
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
