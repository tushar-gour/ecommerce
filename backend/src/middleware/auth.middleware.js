import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await userRepository.findById(decoded.id);

    if (!user) throw ApiError.unauthorized("User no longer exists");

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    if (error instanceof ApiError) return next(error);
    next(ApiError.unauthorized("Invalid token"));
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(ApiError.forbidden("Admin access required"));
  }
  next();
};

export const authorizeVendor = (req, res, next) => {
  if (req.user.role !== "vendor" && req.user.role !== "admin") {
    return next(ApiError.forbidden("Vendor access required"));
  }
  next();
};
