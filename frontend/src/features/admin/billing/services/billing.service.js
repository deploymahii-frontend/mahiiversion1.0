const mockPlans = [
  {
    id: 1,
    name: "Pro",
    price: 29,
    interval: "month",
    features: ["Unlimited orders", "Advanced analytics", "Priority support"],
  },
  {
    id: 2,
    name: "Business",
    price: 99,
    interval: "month",
    features: ["Everything in Pro", "Dedicated account manager", "API access"],
  },
];

export const billingService = {
  getPlans: async () => mockPlans,
  getInvoices: async () => [],
  getRefunds: async () => [],
  getTaxSettings: async () => ({ enabled: true, country: "India" }),
};
