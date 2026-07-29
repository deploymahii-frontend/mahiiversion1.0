import AuthRepository from "./repositories/auth.repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./jwt.service.js";

class AuthService {
  async signup(payload) {
    const existingUser = await AuthRepository.findByMobile(payload.mobile);

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const user = await AuthRepository.createUser(payload);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await AuthRepository.updateRefreshToken(user._id, refreshToken);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login({ mobile, password, device, ipAddress, userAgent }) {
    const user = await AuthRepository.findByMobile(mobile);

    if (!user) {
      throw new Error("Invalid mobile or password.");
    }

    if (user.isLocked()) {
      throw new Error("Account temporarily locked. Try again later.");
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      const updatedUser = await AuthRepository.incrementLoginAttempts(user._id);
      const nextLoginAttempts = updatedUser?.loginAttempts ?? user.loginAttempts + 1;

      if (nextLoginAttempts >= 4) {
        await AuthRepository.lockAccount(user._id);
      }

      throw new Error("Invalid mobile or password.");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await AuthRepository.updateRefreshToken(user._id, refreshToken);
    await AuthRepository.updateLastLogin(user._id);
    await AuthRepository.resetLoginAttempts(user._id);

    return {
      user,
      accessToken,
    };
  }

  async refreshToken(receivedRefreshToken) {
    const decoded = verifyRefreshToken(receivedRefreshToken);
    const user = await AuthRepository.findById(decoded.id);

    if (!user) {
      throw new Error("User not found.");
    }

    if (!user.refreshToken || user.refreshToken !== receivedRefreshToken) {
      throw new Error("Invalid refresh token.");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await AuthRepository.updateRefreshToken(user._id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId) {
    await AuthRepository.clearRefreshToken(userId);

    return {
      success: true,
    };
  }
}

export default new AuthService();
