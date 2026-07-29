import mongoose from 'mongoose';
import dns from 'node:dns';

// Use public DNS servers for Atlas SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const mongoHost = process.env.MONGODB_URI.split('@')[1]?.split('/')[0] || 'MongoDB';
    console.log(`✅ MongoDB Connected: ${mongoHost}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
