export function buildShopFilter(query = {}) {
  const filter = {
    isOpen: true,
    status: "APPROVED",
  };

  if (query.category) {
    filter.category = query.category;
  }

  if (query.city) {
    filter["address.city"] = query.city;
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
