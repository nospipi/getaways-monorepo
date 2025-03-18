import { seed, reset } from "drizzle-seed";
import { db, users } from "./src/index";

const main = async () => {
  try {
    console.log("Resetting database...");
    await reset(db, {
      users,
    });

    console.log("Seeding database...");
    await seed(db, {
      users,
    });

    console.log("Database reset and seed completed successfully!");
  } catch (error) {
    console.error("Error during database operation:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

main();
