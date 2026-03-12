import mongoose from "mongoose";
import env from "./env.js";

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) return;
    try {
      this.connection = await mongoose.connect(env.mongoUri);
      console.log(`MongoDB connected: ${this.connection.connection.host}`);
    } catch (error) {
      console.error(`Database connection error: ${error.message}`);
    }
  }
}

export default new Database();
