import bcrypt from "bcryptjs";
import AuthRepository from "./repositories/auth.repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./jwt.service.js";

class AuthService {
  async signup(payload) {
    const existingUser = await AuthRepository.findByPhone(
      payload.phone
    );

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const user = await AuthRepository.createUser(payload);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await AuthRepository.updateRefreshToken(
      user._id,
      refreshToken
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login(phone, password) {
    const user = await AuthRepository.findByPhone(phone);

    if (!user) {
      throw new Error("Invalid phone or password.");
    }

    if (user.isLocked()) {
      throw new Error(
        "Account temporarily locked. Try again later."
      );
    }

    const validPassword = await user.comparePassword(
      password
    );

    if (!validPassword) {
      await AuthRepository.incrementLoginAttempts(user._id);

      if (user.loginAttempts >= 4) {
        await AuthRepository.lockAccount(user._id);
      }

      throw new Error("Invalid phone or password.");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await AuthRepository.updateRefreshToken(
      user._id,
      refreshToken
    );

    await AuthRepository.updateLastLogin(user._id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await AuthRepository.findById(decoded.id);

    if (!user) {
      throw new Error("User not found.");
    }

    const accessToken = generateAccessToken(user);

    return {
      accessToken,
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
