import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/modules/auth/models/user.model.js';
import bcrypt from 'bcryptjs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const MONGO_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // known dev password
const ADMIN_ROLE = 'super_admin';



async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const admin = new User({
      email: ADMIN_EMAIL,
      password: hashed,
      role: ADMIN_ROLE,
      fullName: 'Admin User',
      phone: '9999999999',
      accountStatus: 'active'
    });
    await admin.save();
    console.log('Admin user created with password:', ADMIN_PASSWORD);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
}

createAdmin();
