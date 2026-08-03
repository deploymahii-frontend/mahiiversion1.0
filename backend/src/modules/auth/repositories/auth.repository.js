import User from "../models/user.model.js";

class AuthRepository {
  async createUser(userData) {
    return User.create(userData);
  }

  async findById(id) {
    return User.findById(id);
  }

  async findByFirebaseUid(uid) {
    return User.findOne({ firebaseUid: uid });
  }

  async findByMobile(mobile) {
    return User.findOne({ phone: mobile }).select("+password +refreshToken");
  }

  async findByMobileWithPassword(mobile) {
    return this.findByMobile(mobile);
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
      },
      { new: true }
    );
  }

  async resetLoginAttempts(userId) {
    return User.findByIdAndUpdate(
      userId,
      {
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

  async lockAccount(userId, minutes = 15) {
    return User.findByIdAndUpdate(
      userId,
      {
        lockUntil: new Date(Date.now() + minutes * 60 * 1000),
      },
      { new: true }
    );
  }
}

export default new AuthRepository();
