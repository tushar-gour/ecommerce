import productRepository from "../repositories/product.repository.js";
import ApiError from "../utils/ApiError.js";
import cloudinary, { isCloudinaryConfigured } from "../config/cloudinary.js";
import env from "../config/env.js";

class ProductService {
  async uploadImage(input) {
    const value = String(input || "").trim();
    if (!value) return null;
    if (value.includes("res.cloudinary.com")) return value;
    if (
      !value.startsWith("http://") &&
      !value.startsWith("https://") &&
      !value.startsWith("data:image/")
    ) {
      throw ApiError.badRequest("Invalid image format");
    }
    if (!isCloudinaryConfigured) {
      if (value.startsWith("data:image/")) {
        throw ApiError.internal("Image upload service is not configured");
      }
      return value;
    }
    const result = await cloudinary.uploader.upload(value, {
      folder: env.cloudinaryFolder,
      resource_type: "image",
    });
    return result.secure_url;
  }

  async resolveImages(images = []) {
    if (!Array.isArray(images) || images.length === 0) {
      throw ApiError.badRequest("At least one image is required");
    }
    const uploaded = await Promise.all(
      images.map((image) => this.uploadImage(image)),
    );
    const cleaned = uploaded.filter(Boolean);
    if (cleaned.length === 0) {
      throw ApiError.badRequest("At least one image is required");
    }
    return cleaned;
  }

  async create(productData) {
    const payload = { ...productData };
    payload.images = await this.resolveImages(productData.images);
    return productRepository.create(payload);
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
    const payload = { ...updateData };
    if (Array.isArray(updateData.images)) {
      payload.images = await this.resolveImages(updateData.images);
    }
    const product = await productRepository.update(id, payload);
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
    const payload = { ...updateData };
    if (Array.isArray(updateData.images)) {
      payload.images = await this.resolveImages(updateData.images);
    }
    return productRepository.update(id, payload);
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
