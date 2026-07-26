import Business from "./business.model.js";

export async function createBusiness(data) {
  return Business.create(data);
}

export async function findBusinessById(id) {
  return Business.findById(id);
}

export async function findBusinessBySlug(slug) {
  return Business.findOne({ slug });
}

export async function findBusinessByOwner(ownerId) {
  return Business.find({ owner: ownerId });
}

export async function updateBusiness(id, data) {
  return Business.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function updateBusinessStatus(id, status) {
  return Business.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
    }
  );
}

export async function deleteBusiness(id) {
  return Business.findByIdAndDelete(id);
}

export async function listBusinesses(filter = {}, options = {}) {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
  } = options;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Business.find(filter).sort(sort).skip(skip).limit(limit),
    Business.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
