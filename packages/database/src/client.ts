import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const DATABASE_URL =
  "postgresql://postgres.zteeoyjwjduibcvkokdl:WtbVpMI7PqpuqzpJ@aws-0-eu-central-1.pooler.supabase.com:6543/postgres";

const client = postgres(DATABASE_URL, {
  onnotice: () => {},
});
export const db = drizzle({ client, schema });
