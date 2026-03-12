import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Store, ArrowRight, Eye, EyeOff } from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import useAuthStore from "../../../core/store/auth.store.js";

const VendorAuthPage = () => {
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuthStore();
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
  });

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success;
    if (isRegister) {
      success = await register({ ...form, role: "vendor" });
    } else {
      success = await login({ email: form.email, password: form.password });
    }
    if (success) navigate("/vendor/dashboard");
  };

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-border/50 p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {isRegister ? "Become a Vendor" : "Vendor Login"}
              </h1>
              <p className="text-xs text-gray-500">
                {isRegister ?
                  "Start selling on our marketplace"
                : "Access your store dashboard"}
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    required
                    className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={form.storeName}
                    onChange={update("storeName")}
                    required
                    className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="My Awesome Store"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                required
                className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="vendor@example.com"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={update("password")}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ?
                    <EyeOff className="w-4 h-4" />
                  : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5
                bg-primary text-white font-medium rounded-2xl hover:bg-primary-hover
                transition-all duration-300 shadow-soft disabled:opacity-60"
            >
              {loading ?
                "Please wait..."
              : <>
                  {isRegister ? "Create Store" : "Sign In"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </>
              }
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isRegister ?
              <>
                Already a vendor?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Sign In
                </button>
              </>
            : <>
                Want to sell?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Register as Vendor
                </button>
              </>
            }
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Customer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAuthPage;
