import { defineConfig } from "drizzle-kit";

const DATABASE_URL =
  "postgresql://postgres.zteeoyjwjduibcvkokdl:WtbVpMI7PqpuqzpJ@aws-0-eu-central-1.pooler.supabase.com:6543/postgres";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
