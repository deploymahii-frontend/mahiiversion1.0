import Shop from "./shop.model.js";

export async function createShop(data){

    return Shop.create(data);

}

export async function findShopByOwner(owner){

    return Shop.findOne({

        owner

    });

}

export async function findShop(id){

    return Shop.findById(id);

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
