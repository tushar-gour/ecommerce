import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Image,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import Navbar from "../../components/layout/navbar.jsx";
import productApiService from "../../../core/services/product.service.js";
import useAuthStore from "../../../core/store/auth.store.js";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Accessories",
  "Home",
  "Sports",
  "Books",
  "Beauty",
  "Other",
];

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  category: "Electronics",
  stock: "",
  images: [""],
  featured: false,
  bestSeller: false,
};

const VendorProductsPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | product._id
  const [form, setForm] = useState({ ...emptyProduct });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      navigate("/vendor/auth");
      return;
    }
  }, [user, navigate]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await productApiService.getVendorProducts();
      setProducts(response.data || []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openNew = () => {
    setForm({ ...emptyProduct });
    setEditing("new");
    setError(null);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      images: product.images?.length ? [...product.images] : [""],
      featured: product.featured || false,
      bestSeller: product.bestSeller || false,
    });
    setEditing(product._id);
    setError(null);
  };

  const closeForm = () => {
    setEditing(null);
    setError(null);
  };

  const updateField = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateImage = (index) => (e) => {
    setForm((prev) => {
      const images = [...prev.images];
      images[index] = e.target.value;
      return { ...prev, images };
    });
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        images: form.images.filter((url) => url.trim()),
      };

      if (payload.images.length === 0) {
        setError("At least one image URL is required");
        setSaving(false);
        return;
      }

      if (editing === "new") {
        await productApiService.createProduct(payload);
      } else {
        await productApiService.updateProduct(editing, payload);
      }
      closeForm();
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await productApiService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      /* ignore */
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/vendor/dashboard")}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
        >
          <ChevronLeft className="w-4 h-4" /> Dashboard
        </button>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Products
          </h1>
          {editing === null && (
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white
                text-sm font-medium rounded-2xl hover:bg-primary-hover transition-all duration-300 shadow-soft"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          )}
        </div>

        {/* Product Form */}
        {editing !== null && (
          <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-soft mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                {editing === "new" ? "New Product" : "Edit Product"}
              </h2>
              <button
                onClick={closeForm}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={updateField("name")}
                    required
                    className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={updateField("category")}
                    className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={updateField("description")}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Describe your product"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={updateField("price")}
                    required
                    className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="29.99"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={updateField("stock")}
                    required
                    className="w-full px-4 py-3 bg-page-bg border border-border rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Image URLs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-500">
                    Image URLs
                  </label>
                  <button
                    type="button"
                    onClick={addImageField}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <Image className="w-3 h-3" /> Add Image
                  </button>
                </div>
                <div className="space-y-2">
                  {form.images.map((url, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={updateImage(i)}
                        className="flex-1 px-4 py-2.5 bg-page-bg border border-border rounded-xl text-sm
                          focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="https://example.com/image.jpg"
                      />
                      {form.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(i)}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={updateField("featured")}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                  />
                  <span className="text-sm text-gray-600">Featured</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.bestSeller}
                    onChange={updateField("bestSeller")}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                  />
                  <span className="text-sm text-gray-600">Best Seller</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 border border-border text-sm font-medium text-gray-600
                    rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white
                    text-sm font-medium rounded-2xl hover:bg-primary-hover transition-all
                    duration-300 shadow-soft disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />{" "}
                  {saving ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product List */}
        {loading ?
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border/50 p-4 animate-pulse flex gap-4"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        : products.length === 0 && editing === null ?
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-card-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-icon" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No products yet
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Add your first product to start selling.
            </p>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white
                font-medium rounded-2xl hover:bg-primary-hover transition-all duration-300"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        : <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-border/50 p-4 shadow-soft
                  hover:shadow-card transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-card-bg rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={product.images?.[0] || ""}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="font-medium text-gray-800">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span>Stock: {product.stock}</span>
                    <span className="hidden sm:inline">{product.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(product)}
                    className="p-2 border border-border rounded-xl text-gray-500
                      hover:bg-gray-50 hover:text-primary transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deleting === product._id}
                    className="p-2 border border-border rounded-xl text-gray-500
                      hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default VendorProductsPage;
