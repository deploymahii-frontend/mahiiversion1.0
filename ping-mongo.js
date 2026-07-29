require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI not set in .env');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

(async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✅ MongoDB Connected and ping successful');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  } finally {
    await client.close();
  }
})();

