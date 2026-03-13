import { v2 as cloudinary } from "cloudinary";
import env from "./env.js";

const hasCloudinaryUrl = !!env.cloudinaryUrl;
const hasCloudinaryKeys =
  !!env.cloudinaryCloudName &&
  !!env.cloudinaryApiKey &&
  !!env.cloudinaryApiSecret;

let isConfigured = false;

if (hasCloudinaryUrl) {
  try {
    const parsed = new URL(env.cloudinaryUrl);
    cloudinary.config({
      cloud_name: parsed.hostname,
      api_key: decodeURIComponent(parsed.username),
      api_secret: decodeURIComponent(parsed.password),
      secure: true,
    });
    isConfigured = true;
    console.log("Cloudinary configured via CLOUDINARY_URL");
  } catch (error) {
    console.error("Failed to configure Cloudinary from URL:", error.message);
  }
} else if (hasCloudinaryKeys) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
    secure: true,
  });
  isConfigured = true;
  console.log("Cloudinary configured via individual keys");
} else {
  console.warn("Cloudinary is not configured. Image uploads will not work.");
}

export default cloudinary;
export const isCloudinaryConfigured = isConfigured;
