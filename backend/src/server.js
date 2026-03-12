import express from "express";
import cors from "cors";
import env from "./config/env.js";
import database from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  configureMiddleware() {
    this.app.use(cors());
    this.app.use(express.json({ limit: "10mb" }));
  }

  configureRoutes() {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/products", productRoutes);
    this.app.use("/api/orders", orderRoutes);
    this.app.use("/api/cart", cartRoutes);
    this.app.use("/api/payment", paymentRoutes);
  }

  configureErrorHandling() {
    this.app.use(errorMiddleware);
  }

  async start() {
    await database.connect();
    this.app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  }
}

const server = new Server();
server.start();
