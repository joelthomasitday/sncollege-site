import bcrypt from "bcryptjs";
import fs from "fs";

const run = async () => {
  const hash = await bcrypt.hash("admin123", 10);
  console.log("\n=== BCRYPT HASH FOR admin123 ===");
  console.log(hash);
  console.log("\nHash Length:", hash.length);
  console.log("Expected Length: 60");
  
  // Write to file as well
  fs.writeFileSync("generated-hash.txt", hash);
  console.log("\n✅ Hash saved to generated-hash.txt");
};
run();
