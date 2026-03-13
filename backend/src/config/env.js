import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

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
    
    // Debug Cloudinary configuration
    console.log("Cloudinary Config Check:");
    console.log("- CLOUDINARY_CLOUD_NAME:", this.cloudinaryCloudName ? "✓" : "✗");
    console.log("- CLOUDINARY_API_KEY:", this.cloudinaryApiKey ? "✓" : "✗");
    console.log("- CLOUDINARY_API_SECRET:", this.cloudinaryApiSecret ? "✓" : "✗");
  }
}

const env = new Environment();
env.validate();

export default env;
