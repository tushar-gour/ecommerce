import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import useCart from "../../../core/hooks/useCart.js";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const image = product.images?.[0] || product.image;

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-card-bg rounded-3xl overflow-hidden transition-all duration-300
        hover:shadow-card block"
    >
      <div className="relative aspect-square overflow-hidden bg-feature-card p-6">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-icon uppercase">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
        </div>

        {product.rating > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-600">
              {product.rating}
            </span>
            {product.numReviews > 0 && (
              <span className="text-xs text-gray-400">
                ({product.numReviews})
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-gray-800">
            ₹{product.price?.toFixed(2)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover
              transition-all duration-300 shadow-soft"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
