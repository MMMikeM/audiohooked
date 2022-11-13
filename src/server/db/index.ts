import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"
import { Database } from "./schema"

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      database: "kysely_test",
    }),
  }),
})

async function demo() {
  const firstUser = await db
    .selectFrom("user")
    .select(["first_name", "last_name", "email", "created_at"])
    .where("user.id", "=", "1")
    .executeTakeFirstOrThrow()

  if (firstUser) {
    console.log(firstUser)
  }
}

demo()

export { db }
