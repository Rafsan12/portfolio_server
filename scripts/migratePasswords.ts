import bcrypt from "bcryptjs";
import { prisma } from "./../src/config/db";

async function migratePassword() {
  try {
    const users = await prisma.user.findMany({
      where: { password: "rafsan123" },
    });

    for (const user of users) {
      if (!user.password) continue;
      const hashed = await bcrypt.hash(user.password, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed },
      });

      console.log(`✅ Updated password for: ${user.email}`);
    }

    console.log("🎉 Specific password migration completed!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

migratePassword();
