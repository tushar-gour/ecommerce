import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  ShoppingCart,
  LogOut,
  Heart,
  Store,
} from "lucide-react";
import useAuth from "../../../core/hooks/useAuth.js";
import useCart from "../../../core/hooks/useCart.js";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Products", path: "/products" },
    { label: "Categories", path: "/products" },
  ];

  const isVendor = user?.role === "vendor";

  return (
    <nav className="sticky top-0 z-50 bg-navbar-bg/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/home"
            className="flex items-center gap-2 text-xl font-semibold text-gray-800 tracking-tight"
          >
            <ShoppingBag className="w-6 h-6 text-primary" strokeWidth={2} />
            <span>Luxe</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-sm font-medium text-gray-500 hover:text-gray-800
                  transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            {isVendor && (
              <Link
                to="/vendor/dashboard"
                className="text-sm font-medium text-primary hover:text-primary-hover
                  transition-colors duration-300 tracking-wide"
              >
                Vendor Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {searchOpen ?
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-48 px-3 py-2 text-sm bg-white border border-border rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 ml-1 rounded-xl hover:bg-card-bg transition-colors duration-300"
                >
                  <X className="w-4 h-4 text-icon" />
                </button>
              </form>
            : <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl hover:bg-card-bg transition-colors duration-300"
              >
                <Search className="w-5 h-5 text-icon" />
              </button>
            }

            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="p-2.5 rounded-xl hover:bg-card-bg transition-colors duration-300"
              >
                <Heart className="w-5 h-5 text-icon" />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl hover:bg-card-bg transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5 text-icon" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white
                  text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ?
              <div className="flex items-center gap-2">
                <Link
                  to="/orders"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors px-2"
                >
                  Orders
                </Link>
                <span className="text-sm text-gray-600">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl hover:bg-card-bg transition-colors duration-300"
                >
                  <LogOut className="w-5 h-5 text-icon" />
                </button>
              </div>
            : <Link
                to="/login"
                className="p-2.5 rounded-xl hover:bg-card-bg transition-colors duration-300"
              >
                <User className="w-5 h-5 text-icon" />
              </Link>
            }
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-card-bg transition-colors"
          >
            {mobileOpen ?
              <X className="w-5 h-5 text-gray-600" />
            : <Menu className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navbar-bg border-t border-border">
          <div className="px-4 py-4 space-y-2">
            <form onSubmit={handleSearch} className="mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-3 text-sm bg-white border border-border rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-600
                  hover:text-gray-800 hover:bg-card-bg rounded-xl transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
            {isVendor && (
              <Link
                to="/vendor/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-primary
                  hover:bg-card-bg rounded-xl transition-all duration-300"
              >
                <Store className="w-4 h-4" /> Vendor Dashboard
              </Link>
            )}
            <div className="pt-2 border-t border-border flex items-center gap-3 px-4 py-3">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <ShoppingCart className="w-5 h-5 text-icon" />
                Cart ({totalItems})
              </Link>
            </div>
            {isAuthenticated && (
              <>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600
                    hover:bg-card-bg rounded-xl transition-all"
                >
                  <Heart className="w-5 h-5 text-icon" /> Wishlist
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600
                    hover:bg-card-bg rounded-xl transition-all"
                >
                  Orders
                </Link>
              </>
            )}
            {isAuthenticated ?
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-600
                  hover:bg-card-bg rounded-xl transition-all"
              >
                Logout
              </button>
            : <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-primary
                  hover:bg-card-bg rounded-xl transition-all"
              >
                Sign In
              </Link>
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
