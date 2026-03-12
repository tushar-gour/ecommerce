import productRepository from "../repositories/product.repository.js";
import ApiError from "../utils/ApiError.js";

class ProductService {
  async create(productData) {
    return productRepository.create(productData);
  }

  async getAll(query = {}) {
    const filter = {};
    if (query.category) filter.category = query.category;
    if (query.featured === "true") filter.featured = true;
    if (query.bestSeller === "true") filter.bestSeller = true;
    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = Number(query.minPrice);
      if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }
    if (query.minRating) {
      filter.rating = { $gte: Number(query.minRating) };
    }
    if (query.inStock === "true") {
      filter.stock = { $gt: 0 };
    }

    const sort = {};
    if (query.sort === "price_asc") sort.price = 1;
    else if (query.sort === "price_desc") sort.price = -1;
    else if (query.sort === "rating") sort.rating = -1;
    else if (query.sort === "newest") sort.createdAt = -1;
    else sort.createdAt = -1;

    return productRepository.findAll(filter, sort);
  }

  async search(query) {
    if (!query) return [];
    return productRepository.search(query);
  }

  async getById(id) {
    const product = await productRepository.findById(id);
    if (!product) throw ApiError.notFound("Product not found");
    return product;
  }

  async update(id, updateData) {
    const product = await productRepository.update(id, updateData);
    if (!product) throw ApiError.notFound("Product not found");
    return product;
  }

  async delete(id) {
    const product = await productRepository.delete(id);
    if (!product) throw ApiError.notFound("Product not found");
    return product;
  }

  async getFeatured() {
    return productRepository.findFeatured();
  }

  async getBestSellers() {
    return productRepository.findBestSellers();
  }

  async getCategories() {
    return productRepository.getDistinctCategories();
  }

  async getByVendor(vendorId) {
    return productRepository.findByVendor(vendorId);
  }

  async vendorUpdate(id, vendorId, updateData) {
    const product = await productRepository.findById(id);
    if (!product) throw ApiError.notFound("Product not found");
    if (product.vendor._id.toString() !== vendorId) {
      throw ApiError.forbidden("Access denied");
    }
    return productRepository.update(id, updateData);
  }

  async vendorDelete(id, vendorId) {
    const product = await productRepository.findById(id);
    if (!product) throw ApiError.notFound("Product not found");
    if (product.vendor._id.toString() !== vendorId) {
      throw ApiError.forbidden("Access denied");
    }
    return productRepository.delete(id);
  }
}

export default new ProductService();
