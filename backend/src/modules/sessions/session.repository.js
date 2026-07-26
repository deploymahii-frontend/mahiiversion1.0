import Session from "./session.model.js";

export function createSession(data) {
  return Session.create(data);
}

export function findByRefreshToken(refreshToken) {
  return Session.findOne({
    refreshToken,
    isActive: true,
  });
}

export function findActiveSessions(userId) {
  return Session.find({
    user: userId,
    isActive: true,
  }).sort({
    updatedAt: -1,
  });
}

export function revokeSession(id) {
  return Session.findByIdAndUpdate(
    id,
    {
      isActive: false,
      revokedAt: new Date(),
    },
    {
      new: true,
    }
  );
}

export function revokeAllSessions(userId) {
  return Session.updateMany(
    {
      user: userId,
      isActive: true,
    },
    {
      isActive: false,
      revokedAt: new Date(),
    }
  );
}

export function deleteExpiredSessions() {
  return Session.deleteMany({
    expiresAt: {
      $lt: new Date(),
    },
  });
}
