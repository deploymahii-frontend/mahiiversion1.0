import AuthService from "../auth.service.js";

function setRefreshTokenCookie(res, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // In production we need SameSite=None + Secure for cross-site cookies.
    // For local development use a more permissive SameSite so the browser accepts the cookie.
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

class AuthController {
  async signup(req, res, next) {
    try {
      const result = await AuthService.signup(req.body);

      return res.status(201).json({
        success: true,
        message: "Account created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { phone, email, password } = req.body;

      const result = await AuthService.login({
        mobile: phone,
        email,
        password,
      });

      if (result.refreshToken) {
        setRefreshTokenCookie(res, result.refreshToken);
      }

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async firebaseSync(req, res, next) {
    try {
      const firebaseUser = req.firebaseUser;
      
      const result = await AuthService.firebaseSync(firebaseUser);

      if (result.refreshToken) {
        setRefreshTokenCookie(res, result.refreshToken);
      }

      return res.status(200).json({
        success: true,
        message: "Firebase sync successful.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      // Try all expected locations for a refresh token
      let refreshToken =
        req.cookies?.refreshToken ||
        req.body?.refreshToken ||
        req.headers["x-refresh-token"] ||
        req.headers["refresh-token"];

      // If not found, try parsing raw Cookie header as a last resort
      if (!refreshToken && req.headers && req.headers.cookie) {
        const cookieHeader = req.headers.cookie;
        const parts = cookieHeader.split(";");
        for (const part of parts) {
          const [k, v] = part.split("=").map(s => s && s.trim());
          if (k === "refreshToken") {
            refreshToken = v;
            break;
          }
        }
      }

      // Debug log for diagnostics (kept concise)
      console.debug("[auth.refresh] refreshToken present:", Boolean(refreshToken));

      const result = await AuthService.refreshToken(refreshToken);

      if (result.refreshToken) {
        setRefreshTokenCookie(res, result.refreshToken);
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      // Log the error with a short marker to help debugging in logs
      console.error("[auth.refresh] error:", error?.message || error);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await AuthService.logout(req.user.id);
      res.clearCookie("refreshToken");

      return res.status(200).json({
        success: true,
        message: "Logged out successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // Dev-only: activate a user by email or id. Only enabled in non-production.
  async activateUser(req, res, next) {
    try {
      if (process.env.NODE_ENV === "production") {
        return res.status(404).json({ success: false, message: "Not found." });
      }

      const { identifier } = req.body;
      if (!identifier) {
        return res.status(400).json({ success: false, message: "identifier is required (email or id)" });
      }

      let result;
      // determine whether identifier is email or id-ish
      if (identifier.includes("@")) {
        result = await (await import("../repositories/auth.repository.js")).default.updateAccountStatusByEmail(identifier, "active");
      } else {
        result = await (await import("../repositories/auth.repository.js")).default.updateAccountStatusById(identifier, "active");
      }

      if (!result) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      return res.status(200).json({ success: true, data: { id: result._id, email: result.email, accountStatus: result.accountStatus } });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
