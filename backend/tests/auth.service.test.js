import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  mockFindById: vi.fn(),
  mockFindByMobile: vi.fn(),
  mockCreateUser: vi.fn(),
  mockUpdateRefreshToken: vi.fn(),
  mockClearRefreshToken: vi.fn(),
  mockUpdateLastLogin: vi.fn(),
  mockResetLoginAttempts: vi.fn(),
  mockIncrementLoginAttempts: vi.fn(),
  mockLockAccount: vi.fn(),
  mockGenerateAccessToken: vi.fn(),
  mockGenerateRefreshToken: vi.fn(),
  mockVerifyRefreshToken: vi.fn(),
}));

vi.mock("../src/modules/auth/repositories/auth.repository.js", () => ({
  default: {
    findById: mocks.mockFindById,
    findByMobile: mocks.mockFindByMobile,
    createUser: mocks.mockCreateUser,
    updateRefreshToken: mocks.mockUpdateRefreshToken,
    clearRefreshToken: mocks.mockClearRefreshToken,
    updateLastLogin: mocks.mockUpdateLastLogin,
    resetLoginAttempts: mocks.mockResetLoginAttempts,
    incrementLoginAttempts: mocks.mockIncrementLoginAttempts,
    lockAccount: mocks.mockLockAccount,
  },
}));

vi.mock("../src/modules/auth/jwt.service.js", () => ({
  generateAccessToken: mocks.mockGenerateAccessToken,
  generateRefreshToken: mocks.mockGenerateRefreshToken,
  verifyRefreshToken: mocks.mockVerifyRefreshToken,
}));

import authService from "../src/modules/auth/auth.service.js";

describe("Auth Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rotates refresh tokens on refresh", async () => {
    const user = { _id: "user-1", refreshToken: "old-refresh" };
    mocks.mockVerifyRefreshToken.mockReturnValue({ id: "user-1" });
    mocks.mockFindById.mockResolvedValue(user);
    mocks.mockGenerateAccessToken.mockReturnValue("new-access");
    mocks.mockGenerateRefreshToken.mockReturnValue("new-refresh");
    mocks.mockUpdateRefreshToken.mockResolvedValue({});

    const result = await authService.refreshToken("old-refresh");

    expect(result).toEqual({ accessToken: "new-access", refreshToken: "new-refresh" });
    expect(mocks.mockUpdateRefreshToken).toHaveBeenCalledWith("user-1", "new-refresh");
  });

  it("locks the account after the threshold is reached", async () => {
    const user = {
      _id: "user-1",
      loginAttempts: 3,
      isLocked: () => false,
      comparePassword: vi.fn().mockResolvedValue(false),
    };
    mocks.mockFindByMobile.mockResolvedValue(user);
    mocks.mockIncrementLoginAttempts.mockResolvedValue({ _id: "user-1", loginAttempts: 4 });
    mocks.mockLockAccount.mockResolvedValue({});

    await expect(authService.login("1234567890", "wrong-pass")).rejects.toThrow("Invalid mobile or password.");
    expect(mocks.mockIncrementLoginAttempts).toHaveBeenCalledWith("user-1");
    expect(mocks.mockLockAccount).toHaveBeenCalledWith("user-1");
  });
});
