import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import AuthField from "../../components/auth/auth.field.jsx";
import AuthButton from "../../components/auth/auth.button.jsx";
import useAuth from "../../../core/hooks/useAuth.js";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form);
    if (success) navigate("/home");
  };

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
            <ShoppingBag className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-card border border-border/50">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthField
              label="Email"
              type="email"
              value={form.email}
              onChange={updateField("email")}
              placeholder="you@example.com"
            />
            <AuthField
              label="Password"
              type="password"
              value={form.password}
              onChange={updateField("password")}
              placeholder="Enter your password"
            />
            <div className="pt-2">
              <AuthButton loading={loading}>Sign In</AuthButton>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
