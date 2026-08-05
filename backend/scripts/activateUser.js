import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/modules/auth/models/user.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;
if (!MONGO_URI) {
  console.error('Missing MONGO_URI / DATABASE_URL in environment.');
  process.exit(1);
}

const identifier = process.argv[2];
if (!identifier) {
  console.error('Usage: node ./scripts/activateUser.js <email-or-id>');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const query = identifier.includes('@') ? { email: identifier } : { _id: identifier };

    const user = await User.findOneAndUpdate(query, { accountStatus: 'active' }, { returnDocument: 'after' });

    if (!user) {
      console.error('User not found for identifier:', identifier);
      process.exit(1);
    }

    console.log('Activated user:', {
      id: user._id?.toString?.() || user._id,
      email: user.email,
      accountStatus: user.accountStatus,
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error activating user:', err);
    try { await mongoose.disconnect(); } catch {}
    process.exit(1);
  }
})();
