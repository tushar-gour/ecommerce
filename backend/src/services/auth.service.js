import jwt from "jsonwebtoken";
import env from "../config/env.js";
import userRepository from "../repositories/user.repository.js";
import ApiError from "../utils/ApiError.js";

class AuthService {
  generateToken(userId) {
    return jwt.sign({ id: userId }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
  }

  async register({ name, email, password, role, storeName }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.conflict("Email already registered");
    }

    const userData = { name, email, password };
    if (role === "vendor") {
      if (!storeName)
        throw ApiError.badRequest("Store name is required for vendors");
      userData.role = "vendor";
      userData.storeName = storeName;
    }

    const user = await userRepository.create(userData);
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storeName: user.storeName,
      },
      token,
    };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storeName: user.storeName,
      },
      token,
    };
  }

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.notFound("User not found");
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      storeName: user.storeName,
    };
  }

  async getWishlist(userId) {
    return userRepository.getWishlist(userId);
  }

  async addToWishlist(userId, productId) {
    return userRepository.addToWishlist(userId, productId);
  }

  async removeFromWishlist(userId, productId) {
    return userRepository.removeFromWishlist(userId, productId);
  }
}

export default new AuthService();
