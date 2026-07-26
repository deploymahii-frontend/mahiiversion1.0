import Product from "./product.model.js";

export const create = (data) => Product.create(data);

export const findById = (id) =>
  Product.findById(id).populate("shop", "name slug");

export const findBySlug = (slug) =>
  Product.findOne({ slug }).populate("shop", "name slug");

export const findByShop = (shopId) =>
  Product.find({ shop: shopId })
    .sort({ createdAt: -1 });

export const update = (id, data) =>
  Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

export const remove = (id) =>
  Product.findByIdAndDelete(id);

export const getAll = (filter = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
  } = options;

  return Product.find(filter)
    .populate("shop", "name slug")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const count = (filter = {}) =>
  Product.countDocuments(filter);

export const search = (keyword) =>
  Product.find({
    $text: {
      $search: keyword,
    },
  }).populate("shop", "name slug");

export async function createProduct(data){

    return Product.create(data);

}

export async function getProducts(shopId){

    return Product.find({

        shop:shopId

    });

}

export async function updateProduct(

    id,

    data

){

    return Product.findByIdAndUpdate(

        id,

        data,

        {

            new:true

        }

    );
}

export async function searchProducts(query){

    return Product.find({

        $text:{

            $search:query

        }

    });

}

export async function bulkCreateProducts(

    products

){

    return Product.insertMany(

        products

    );

}

export async function decreaseInventory(

    productId,

    quantity

){

    await Product.findByIdAndUpdate(

        productId,

        {

            $inc:{

                "inventory.quantity":-quantity

            }

        }

    );

}
