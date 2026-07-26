import { connectDatabase } from "../src/database/mongodb.js";
import Category from "../src/modules/categories/category.model.js";
import Shop from "../src/modules/shops/shop.model.js";
import Product from "../src/modules/products/product.model.js";
import Offer from "../src/modules/offers/offer.model.js";
import Moment from "../src/modules/moments/moment.model.js";
import User from "../src/modules/users/user.model.js";

async function seed() {
  await connectDatabase();

  console.log('Clearing existing sample data...');
  await Promise.all([
    Category.deleteMany({}),
    Shop.deleteMany({}),
    Product.deleteMany({}),
    Offer.deleteMany({}),
    Moment.deleteMany({}),
  ]);

  console.log('Seeding categories...');
  const categories = await Category.insertMany([
    { name: 'Food', slug: 'food' },
    { name: 'Groceries', slug: 'groceries' },
    { name: 'Beverages', slug: 'beverages' },
  ]);

  console.log('Seeding user...');
  const user = await User.create({
    firstName: 'Seed',
    lastName: 'User',
    email: 'seed.user@example.com',
    password: 'password',
    mobile: '7000000000',
  });

  console.log('Seeding shops...');
  const shops = await Shop.insertMany([
    {
      owner: user._id,
      name: 'Tasty Biryani',
      slug: 'tasty-biryani',
      shopCode: 'SB-001',
      isActive: true,
      isFeatured: true,
      location: { type: 'Point', coordinates: [72.0, 20.0] },
      rating: 4.5,
      phone: '9999999999',
      category: 'restaurant',
      email: 'tasty@example.com',
    },
    {
      owner: user._id,
      name: 'DailyMart',
      slug: 'dailymart',
      shopCode: 'DM-001',
      isActive: true,
      location: { type: 'Point', coordinates: [72.01, 20.002] },
      rating: 4.2,
      phone: '8888888888',
      category: 'grocery',
      email: 'dailymart@example.com',
    },
  ]);

  console.log('Seeding products...');
  const products = await Product.insertMany([
    {
      name: 'Chicken Biryani',
      slug: 'chicken-biryani',
      shop: shops[0]._id,
      price: 250,
      status: 'ACTIVE',
      type: 'FOOD',
    },
    {
      name: 'Cold Coffee',
      slug: 'cold-coffee',
      shop: shops[1]._id,
      price: 80,
      status: 'ACTIVE',
      type: 'FOOD',
    },
  ]);

  console.log('Seeding offers...');
  await Offer.insertMany([
    {
      title: '10% off on Biryani',
      shop: shops[0]._id,
      isActive: true,
      status: 'active',
      createdBy: user._id,
      type: 'percentage',
      value: 10,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  ]);

  console.log('Seeding moments...');
  await Moment.insertMany([
    {
      title: 'Fresh Biryani served today!',
      description: 'Our special biryani is hot and ready.',
      creator: user._id,
      shop: shops[0]._id,
      videoUrl: 'https://example.com/video.mp4',
      thumbnailUrl: '',
      type: 'SHOP_PROMOTION',
      status: 'PUBLISHED',
    },
  ]);

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
