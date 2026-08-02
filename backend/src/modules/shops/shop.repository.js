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
