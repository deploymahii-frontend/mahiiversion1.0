export const ACCOUNT_STATUS = Object.freeze({
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  DELETED: "DELETED",
});

export const LOGIN_PROVIDER = Object.freeze({
  LOCAL: "LOCAL",
  GOOGLE: "GOOGLE",
  APPLE: "APPLE",
});

export const TOKEN_TYPE = Object.freeze({
  ACCESS: "ACCESS",
  REFRESH: "REFRESH",
});

export const DEFAULT_ROLE = "CUSTOMER";

export const MAX_LOGIN_ATTEMPTS = 5;

export const ACCOUNT_LOCK_MINUTES = 30;
