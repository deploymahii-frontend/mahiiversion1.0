export function buildShopFilter(query = {}) {
  const filter = {
    status: "APPROVED",
  };

  const searchTerm = query.search || query.q;
  if (searchTerm && String(searchTerm).trim()) {
    const regex = new RegExp(String(searchTerm).trim(), "i");
    filter.$or = [
      { name: regex },
      { category: regex },
      { description: regex },
      { "address.city": regex },
      { "address.line1": regex },
    ];
  }

  if (query.category && query.category !== "ALL") {
    filter.category = new RegExp(`^${query.category}$`, "i");
  }

  if (query.city) {
    filter["address.city"] = new RegExp(query.city, "i");
  }

  if (query.pureVeg === "true") {
    filter["facilities.pureVeg"] = true;
  }

  if (query.pickup === "true") {
    filter["fulfillment.pickup"] = true;
  }

  if (query.delivery === "true") {
    filter["fulfillment.delivery"] = true;
  }

  if (query.cash === "true") {
    filter["paymentSettings.acceptsCash"] = true;
  }

  if (query.upi === "true") {
    filter["paymentSettings.acceptsUPI"] = true;
  }

  if (query.parking === "true") {
    filter["facilities.parking"] = true;
  }

  if (query.wifi === "true") {
    filter["facilities.wifi"] = true;
  }

  if (query.family === "true") {
    filter["facilities.familyFriendly"] = true;
  }

  return filter;
}
