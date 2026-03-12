import ProductModel from "../models/product.model.js";

class ProductRepository {
  async create(productData) {
    return ProductModel.create(productData);
  }

  async findAll(filter = {}, sort = { createdAt: -1 }) {
    return ProductModel.find(filter)
      .sort(sort)
      .populate("vendor", "name storeName");
  }

  async findById(id) {
    return ProductModel.findById(id).populate("vendor", "name storeName");
  }

  async update(id, updateData) {
    return ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return ProductModel.findByIdAndDelete(id);
  }

  async findFeatured() {
    return ProductModel.find({ featured: true })
      .limit(10)
      .populate("vendor", "name storeName");
  }

  async findBestSellers() {
    return ProductModel.find({ bestSeller: true })
      .limit(10)
      .populate("vendor", "name storeName");
  }

  async findByCategory(category) {
    return ProductModel.find({ category }).populate("vendor", "name storeName");
  }

  async getDistinctCategories() {
    return ProductModel.distinct("category");
  }

  async search(query) {
    return ProductModel.find({ $text: { $search: query } })
      .sort({ score: { $meta: "textScore" } })
      .populate("vendor", "name storeName");
  }

  async findByVendor(vendorId) {
    return ProductModel.find({ vendor: vendorId }).sort({ createdAt: -1 });
  }

  async countByVendor(vendorId) {
    return ProductModel.countDocuments({ vendor: vendorId });
  }
}

export default new ProductRepository();
