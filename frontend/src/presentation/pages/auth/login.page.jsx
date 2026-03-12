import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <div className="bg-white rounded-3xl p-8 shadow-card border border-border/50">
          <div className="text-center mb-8">
            <img
              src="/images/store_logo.png"
              alt="Tushar Store"
              className="w-12 h-12 mx-auto mb-3"
            />
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your account
            </p>
          </div>
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
