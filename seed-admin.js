import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";

// Read .env.local manually
const envContent = fs.readFileSync(".env.local", "utf-8");
const MONGODB_URI = envContent.match(/MONGODB_URI=(.+)/)?.[1]?.trim();

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}


const AdminUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: String,
});

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

async function seedAdmin() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    const email = "admin@example.com";
    const password = "admin123";
    
    // Generate proper hash
    console.log("🔐 Generating password hash...");
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("✅ Hash generated:", passwordHash);
    console.log("   Hash length:", passwordHash.length, "(should be 60)\n");

    // Check if admin exists
    const existingAdmin = await AdminUser.findOne({ email });

    if (existingAdmin) {
      console.log("📝 Admin user already exists. Updating password hash...");
      existingAdmin.passwordHash = passwordHash;
      await existingAdmin.save();
      console.log("✅ Admin user updated successfully!");
    } else {
      console.log("➕ Creating new admin user...");
      await AdminUser.create({
        name: "Super Admin",
        email: email,
        passwordHash: passwordHash,
        role: "admin",
      });
      console.log("✅ Admin user created successfully!");
    }

    console.log("\n📧 Email:", email);
    console.log("🔑 Password:", password);
    console.log("\n✨ You can now login with these credentials!");

    await mongoose.disconnect();
    console.log("\n👋 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seedAdmin();
