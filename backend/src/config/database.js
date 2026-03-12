import mongoose from "mongoose";
import env from "./env.js";

class Database {
  constructor() {
    this.connection = null;
    this.promise = null;
  }

  async connect() {
    if (this.connection) return;
    if (this.promise) return this.promise;
    this.promise = mongoose.connect(env.mongoUri);
    try {
      this.connection = await this.promise;
      console.log(`MongoDB connected: ${this.connection.connection.host}`);
    } catch (error) {
      this.promise = null;
      console.error(`Database connection error: ${error.message}`);
      throw error;
    }
  }
}

export default new Database();
