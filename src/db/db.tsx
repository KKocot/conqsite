import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import "dotenv/config";
import * as whitelist from "./schema/whitelist";
import * as auth from "./schema/auth";
import postgres from "postgres";

const migrationConnection = postgres(process.env.DATABASE_URL!, { max: 1 });
const queryConnection = postgres(process.env.DATABASE_URL!);

const schema = { ...auth, ...whitelist };
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}
let db: PostgresJsDatabase<typeof schema>;
if (process.env.NODE_ENV === "production") {
  db = drizzle(queryConnection, {
    schema,
  });
} else {
  if (!global.db)
    global.db = drizzle(queryConnection, {
      schema: { ...auth, ...whitelist },
    });

  db = global.db;
}
export { db };
