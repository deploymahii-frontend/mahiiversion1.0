import User from "../models/user.model.js";

class AuthRepository {
  async createUser(userData) {
    return User.create(userData);
  }

  async findById(id) {
    return User.findById(id);
  }

  async findByPhone(phone) {
    return User.findOne({ phone }).select("+password +refreshToken");
  }

  async findByEmail(email) {
    return User.findOne({ email }).select("+password +refreshToken");
  }

  async updateRefreshToken(userId, refreshToken) {
    return User.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true }
    );
  }

  async clearRefreshToken(userId) {
    return User.findByIdAndUpdate(
      userId,
      { refreshToken: null },
      { new: true }
    );
  }

  async updateLastLogin(userId) {
    return User.findByIdAndUpdate(
      userId,
      {
        lastLogin: new Date(),
        loginAttempts: 0,
        lockUntil: null,
      },
      { new: true }
    );
  }

  async incrementLoginAttempts(userId) {
    return User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          loginAttempts: 1,
        },
      },
      { new: true }
    );
  }

  async lockAccount(userId, minutes = 30) {
    return User.findByIdAndUpdate(
      userId,
      {
        lockUntil: new Date(
          Date.now() + minutes * 60 * 1000
        ),
      },
      { new: true }
    );
  }
}

export default new AuthRepository();
