import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import env from "./config/env.js";
import UserModel from "./models/user.model.js";
import ProductModel from "./models/product.model.js";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

const seed = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Connected to MongoDB");

    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});

    const hashedPassword = await bcrypt.hash("thisispassword", 12);

    const [admin, vendor1, vendor2, customer] = await UserModel.insertMany([
      {
        name: "Admin User",
        email: "admin@store.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "TechStore",
        email: "vendor1@store.com",
        password: hashedPassword,
        role: "vendor",
        storeName: "TechStore Electronics",
      },
      {
        name: "FashionHub",
        email: "vendor2@store.com",
        password: hashedPassword,
        role: "vendor",
        storeName: "FashionHub Styles",
      },
      {
        name: "Tushar Gour",
        email: "tushar@gmail.com",
        password: hashedPassword,
        role: "user",
      },
    ]);

    const products = await ProductModel.insertMany([
      {
        name: "iPhone 15 Pro Max",
        description:
          "The most powerful iPhone ever with A17 Pro chip, titanium design, 48MP camera system, and all-day battery life.",
        price: 1199,
        category: "Electronics",
        stock: 25,
        images: [
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
        ],
        vendor: vendor1._id,
        featured: true,
        bestSeller: true,
        rating: 4.8,
        numReviews: 234,
      },
      {
        name: "MacBook Pro 16-inch M3 Max",
        description:
          "Supercharged by M3 Max chip with up to 128GB unified memory, stunning Liquid Retina XDR display.",
        price: 2499,
        category: "Electronics",
        stock: 15,
        images: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        ],
        vendor: vendor1._id,
        featured: true,
        bestSeller: false,
        rating: 4.9,
        numReviews: 156,
      },
      {
        name: "AirPods Pro 2nd Gen",
        description:
          "Adaptive Audio, USB-C charging, up to 2x more Active Noise Cancellation than the previous generation.",
        price: 249,
        category: "Electronics",
        stock: 50,
        images: [
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.epic.com.mt%2Fwp-content%2Fuploads%2F2023%2F03%2FAirPods_Pro_2nd-Gen-1.png&f=1&nofb=1&ipt=dfc97995e9ef993f46880eb166e387cd1a7ca20c87a3eb5dd20aa1c1e8827e24",
        ],
        vendor: vendor1._id,
        featured: false,
        bestSeller: true,
        rating: 4.7,
        numReviews: 412,
      },
      {
        name: "Apple Watch Ultra 2",
        description:
          "The most rugged and capable Apple Watch with precision dual-frequency GPS and 36-hour battery life.",
        price: 799,
        category: "Electronics",
        stock: 20,
        images: [
          "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800",
        ],
        vendor: vendor1._id,
        featured: true,
        bestSeller: false,
        rating: 4.6,
        numReviews: 89,
      },
      {
        name: "iPad Air M2",
        description:
          "Powerful M2 chip, stunning 11-inch Liquid Retina display, and all-day battery life in a thin and light design.",
        price: 599,
        category: "Electronics",
        stock: 30,
        images: [
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
        ],
        vendor: vendor1._id,
        featured: false,
        bestSeller: true,
        rating: 4.5,
        numReviews: 178,
      },
      {
        name: "Premium Leather Jacket",
        description:
          "Handcrafted genuine leather jacket with a modern slim fit. Perfect for casual and semi-formal occasions.",
        price: 299,
        category: "Fashion",
        stock: 40,
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
        ],
        vendor: vendor2._id,
        featured: true,
        bestSeller: true,
        rating: 4.4,
        numReviews: 67,
      },
      {
        name: "Designer Sunglasses",
        description:
          "UV400 protection polarized lenses with lightweight titanium frame. Includes premium carrying case.",
        price: 189,
        category: "Fashion",
        stock: 60,
        images: [
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
        ],
        vendor: vendor2._id,
        featured: false,
        bestSeller: true,
        rating: 4.3,
        numReviews: 95,
      },
      {
        name: "Classic White Sneakers",
        description:
          "Minimalist design with premium leather upper, memory foam insole, and durable rubber outsole.",
        price: 129,
        category: "Fashion",
        stock: 80,
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
        ],
        vendor: vendor2._id,
        featured: true,
        bestSeller: false,
        rating: 4.6,
        numReviews: 203,
      },
      {
        name: "Wireless Charging Pad",
        description:
          "15W fast wireless charger compatible with all Qi-enabled devices. Sleek minimalist design.",
        price: 39,
        category: "Accessories",
        stock: 100,
        images: [
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FH8bcd84b2118e4157b4fbe11c800599fei.jpeg&f=1&nofb=1&ipt=2a2465185c32cdfb473d6b64835f805d7060091ef9325ba551f4d131b8665c94",
        ],
        vendor: vendor1._id,
        featured: false,
        bestSeller: true,
        rating: 4.2,
        numReviews: 341,
      },
      {
        name: "Minimalist Backpack",
        description:
          "Water-resistant fabric with padded laptop compartment, USB charging port, and anti-theft design.",
        price: 79,
        category: "Accessories",
        stock: 45,
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
        ],
        vendor: vendor2._id,
        featured: true,
        bestSeller: false,
        rating: 4.5,
        numReviews: 128,
      },
      {
        name: "Noise Cancelling Headphones",
        description:
          "Premium over-ear headphones with 40-hour battery, hi-res audio, and plush memory foam cushions.",
        price: 349,
        category: "Electronics",
        stock: 35,
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        ],
        vendor: vendor1._id,
        featured: true,
        bestSeller: true,
        rating: 4.7,
        numReviews: 267,
      },
      {
        name: "Organic Cotton T-Shirt",
        description:
          "100% organic cotton, sustainably sourced. Available in multiple colors with a relaxed modern fit.",
        price: 45,
        category: "Fashion",
        stock: 120,
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        ],
        vendor: vendor2._id,
        featured: false,
        bestSeller: false,
        rating: 4.1,
        numReviews: 56,
      },
    ]);

    console.log(`Seeded ${products.length} products`);
    console.log("Seed accounts:");
    console.log("  Admin:    admin@store.com / thisispassword");
    console.log("  Vendor 1: vendor1@store.com / thisispassword");
    console.log("  Vendor 2: vendor2@store.com / thisispassword");
    console.log("  Customer: john@test.com / thisispassword");

    await mongoose.disconnect();
    console.log("Seed complete");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();
