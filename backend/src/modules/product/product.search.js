export function buildProductFilter(query = {}) {
  const filter = {};

  if (query.category) {
    filter.category = query.category;
  }

  if (query.shop) {
    filter.shop = query.shop;
  }

  if (query.foodType) {
    filter.foodType = query.foodType;
  }

  if (query.available === "true") {
    filter.isAvailable = true;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.search) {
    filter.$or = [
      {
        name: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        tags: {
          $regex: query.search,
          $options: "i",
        },
      },
    ];
  }

  return filter;
}
