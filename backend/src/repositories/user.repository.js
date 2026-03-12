import UserModel from "../models/user.model.js";

class UserRepository {
  async create(userData) {
    return UserModel.create(userData);
  }

  async findByEmail(email) {
    return UserModel.findOne({ email }).select("+password");
  }

  async findById(id) {
    return UserModel.findById(id);
  }

  async addToWishlist(userId, productId) {
    return UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: productId } },
      { new: true },
    ).populate("wishlist");
  }

  async removeFromWishlist(userId, productId) {
    return UserModel.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true },
    ).populate("wishlist");
  }

  async getWishlist(userId) {
    const user = await UserModel.findById(userId).populate("wishlist");
    return user?.wishlist || [];
  }
}

export default new UserRepository();
