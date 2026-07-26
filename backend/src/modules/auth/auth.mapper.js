export function toAuthResponse(user, accessToken, refreshToken) {
  return {
    accessToken,
    refreshToken,

    user: {
      id: user._id,

      firstName: user.firstName,

      lastName: user.lastName,

      email: user.email,

      mobile: user.mobile,

      role: user.role,

      permissions: user.permissions,

      company: user.company,

      branch: user.branch,

      status: user.status,

      avatar: user.avatar,

      lastLogin: user.lastLogin,
    },
  };
}
