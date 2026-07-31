import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../backend/src/modules/users/user.model.js";

dotenv.config({ path: "../backend/.env" });

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const admins = await User.find({ role: { $in: ["ADMIN", "SUPER_ADMIN"] } });
    if (admins.length > 0) {
      console.log("Found admins:");
      admins.forEach(a => console.log(`Mobile: ${a.mobile}, Role: ${a.role}`));
    } else {
      console.log("No admins found in the database.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
  }
}

checkAdmin();
