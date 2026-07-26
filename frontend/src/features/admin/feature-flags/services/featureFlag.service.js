const FEATURE_FLAGS = [
  {
    id: 1,
    key: "online_ordering",
    name: "Online Ordering",
    description: "Allow customers to place orders directly from the app.",
    enabled: true,
    rolloutPercentage: 100,
    environments: ["Development", "Staging", "Production"],
    userRoles: ["ADMIN", "SHOP_OWNER", "CUSTOMER"],
    countries: ["India"],
    cities: ["Kolhapur"],
    startDate: "2026-07-01",
    endDate: "",
    createdBy: "System",
    updatedBy: "Admin",
    createdAt: "2026-07-01T10:00:00Z",
    updatedAt: "2026-07-20T15:30:00Z",
  },
  {
    id: 2,
    key: "cashback_program",
    name: "Cashback Program",
    description: "Enable exclusive cashback offers for premium customers.",
    enabled: false,
    rolloutPercentage: 25,
    environments: ["Staging", "Production"],
    userRoles: ["ADMIN", "CUSTOMER"],
    countries: ["India"],
    cities: ["Pune"],
    startDate: "2026-08-01",
    endDate: "2026-09-01",
    createdBy: "Ops",
    updatedBy: "Ops",
    createdAt: "2026-07-10T10:00:00Z",
    updatedAt: "2026-07-18T11:00:00Z",
  },
];

export async function getFeatureFlags() {
  return Promise.resolve(FEATURE_FLAGS);
}

export async function createFeatureFlag(payload) {
  return Promise.resolve({
    id: Date.now(),
    ...payload,
  });
}

export async function updateFeatureFlag(id, payload) {
  return Promise.resolve({ id, ...payload });
}

export async function deleteFeatureFlag(id) {
  return Promise.resolve({ id, deleted: true });
}
