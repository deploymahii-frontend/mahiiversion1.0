import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../backend/src/modules/users/user.model.js";
import bcrypt from "bcrypt";

dotenv.config({ path: "../.env" });

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check for existing admin
    let admin = await User.findOne({ role: "SUPER_ADMIN" });
    
    if (!admin) {
      console.log("No SUPER_ADMIN found. Creating one...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("NewAdmin@2026!", salt);
      
      admin = await User.create({
        firstName: "Mahii",
        lastName: "Super Admin",
        mobile: "9999999999",
        email: "admin@mahii.dev",
        password: hashedPassword,
        role: "SUPER_ADMIN",
        status: "ACTIVE",
        verified: true,
      });
      console.log("Admin created successfully!");
    } else {
      console.log("SUPER_ADMIN already exists:");
    }
    
    console.log("-----------------------------------------");
    console.log(`Email:  ${admin.email}`);
    console.log(`Mobile: ${admin.mobile}`);
    console.log(`Role:   ${admin.role}`);
    console.log("Password: NewAdmin@2026! (if just created, otherwise unknown)");
    console.log("-----------------------------------------");
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedAdmin();
