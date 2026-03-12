import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const SplashPage = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800);
    const navTimer = setTimeout(() => navigate("/home"), 2300);
    return () => {
      clearTimeout(timer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 bg-page-bg flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-4 animate-pulse">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl">
          <ShoppingBag className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Tushar Store
        </h1>
        <p className="text-sm text-gray-400">Your everyday store</p>
      </div>
    </div>
  );
};

export default SplashPage;
