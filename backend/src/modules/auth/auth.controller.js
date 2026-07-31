import * as authService from "./auth.service.js";

function getClientIp(req) {
  return req.ip || req.headers["x-forwarded-for"] || req.connection?.remoteAddress || "unknown";
}

function setRefreshTokenCookie(res, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export async function signup(req, res, next) {
  try {
    const result = await authService.signup(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const result = await authService.login({
      ...req.body,
      mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
      device: req.body.device || req.headers["user-agent"],
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"],
    });

    const { accessToken, refreshToken, user } = result;

    if (refreshToken) {
      setRefreshTokenCookie(res, refreshToken);
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    await authService.logout(req.user.id);

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutAll(req, res, next) {
  try {
    await authService.logoutAll(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Logged out of all devices successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    const result = await authService.refreshToken(refreshToken);

    if (result.refreshToken) {
      setRefreshTokenCookie(res, result.refreshToken);
    }

    return res.status(200).json({
      success: true,
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    await authService.forgotPassword(req.body.email);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    await authService.resetPassword(req.body);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    await authService.changePassword(req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req, res, next) {
  try {
    const profile = await authService.getProfile(req.user.id);

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function getActiveSessions(req, res, next) {
  try {
    const sessions = await authService.getActiveSessions(req.user.id);

    return res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    next(error);
  }
}
