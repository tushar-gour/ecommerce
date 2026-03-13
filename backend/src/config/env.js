import dotenv from "dotenv";

dotenv.config();

class Environment {
  constructor() {
    this.port = parseInt(process.env.PORT, 10) || 5000;
    this.mongoUri = process.env.MONGO_URI;
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
    this.nodeEnv = process.env.NODE_ENV || "development";
    this.razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    this.razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    this.cloudinaryUrl = process.env.CLOUDINARY_URL;
    this.cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
    this.cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
    this.cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
    this.cloudinaryFolder =
      process.env.CLOUDINARY_FOLDER || "tushar-store/products";
    this.corsOrigin = process.env.CORS_ORIGIN || "*";
    this.bodyLimit = process.env.BODY_LIMIT || "10mb";
  }

  validate() {
    const required = ["mongoUri", "jwtSecret"];
    for (const key of required) {
      if (!this[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    }
  }
}

const env = new Environment();
env.validate();

export default env;
