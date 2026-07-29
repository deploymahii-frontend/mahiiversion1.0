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

  async firebaseSync(firebaseUser) {
    const { uid, phone_number, email, name } = firebaseUser;

    // 1. Check if user already exists by Firebase UID
    let user = await AuthRepository.findByFirebaseUid(uid);

    if (!user) {
      // 2. Check by phone or email if UID not found
      if (phone_number) {
        user = await AuthRepository.findByMobile(phone_number);
      } else if (email) {
        user = await AuthRepository.findByEmail(email);
      }

      // 3. Link existing user to Firebase UID, or create a new user
      if (user) {
        user.firebaseUid = uid;
        await user.save();
      } else {
        // Create new user (Generate a random password since Firebase handles auth)
        const randomPassword = Math.random().toString(36).slice(-8) + "Aa1@";
        
        user = await AuthRepository.createUser({
          fullName: name || email?.split('@')[0] || "Mahii User",
          email: email || null,
          phone: phone_number || `no-phone-${uid}`, // Fallback if no phone
          password: randomPassword,
          firebaseUid: uid,
          accountStatus: "active", // Auto-activate Firebase users
          phoneVerified: !!phone_number,
          emailVerified: !!email,
        });
      }
    }

    // Generate JWTs for our own session management
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await AuthRepository.updateRefreshToken(user._id, refreshToken);
    await AuthRepository.updateLastLogin(user._id);

    return {
      user,
      accessToken,
      refreshToken,
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
