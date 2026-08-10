import Shop from "./shop.model.js";

export async function createShop(data){

    return Shop.create(data);

}

export async function findShopByOwner(owner){

    return Shop.findOne({

        owner

    });

}

export async function findShopById(id){

    return Shop.findById(id);

}

export async function findShopBySlug(slug){

    return Shop.findOne({ slug });

}

export async function listShops(filter = {}, options = {}){
    const page = Number(options.page) > 0 ? Number(options.page) : 1;
    const limit = Number(options.limit) > 0 ? Number(options.limit) : 20;

    return Shop.find(filter)
        .sort(options.sort || { createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
}

export async function deleteShop(id){

    return Shop.findByIdAndDelete(id);

}

export async function updateShop(id,data){
    return Shop.findByIdAndUpdate(
        id,
        data,
        {
            new:true
        }
    );
}

export async function searchShops(query) {
  if (!query) return Shop.find({ status: "APPROVED" });
  const regex = new RegExp(query, "i");
  return Shop.find({
    status: "APPROVED",
    $or: [
      { name: regex },
      { category: regex },
      { description: regex },
      { "address.city": regex },
      { "address.line1": regex },
    ],
  });
}

export async function findNearby({ longitude, latitude, maxDistance = 50000, filter = {} }) {
  const query = {
    ...filter,
    "address.location": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
  };
  try {
    return await Shop.find(query);
  } catch (err) {
    return await Shop.find({ status: "APPROVED", ...filter });
  }
}
