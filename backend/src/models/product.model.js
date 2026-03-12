import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    images: {
      type: [String],
      validate: [(arr) => arr.length > 0, "At least one image is required"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor is required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1 });
productSchema.index({ vendor: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ bestSeller: 1 });
productSchema.index({ name: "text", description: "text" });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

export default mongoose.model("Product", productSchema);
