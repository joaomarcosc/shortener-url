import { db } from "@/infra/db/database";
import { sql } from "kysely";
import cron from "node-cron";

export function runCronJobs() {
  // Soft Delete Links without register user after 24h active
  cron.schedule("0 * * * * *", async () => {
    const deletedAt = new Date();

    try {
      await db.transaction().execute((trx) => {
        return trx
          .updateTable("url")
          .set({ deletedAt })
          .where(sql`DATE_PART('hour', now() - "created_at")`, ">", 24)
          .where("deletedAt", "is", null)
          .where("userId", "is", null)
          .execute();
      });
      console.log("Running cron one hour");
      console.log("URLs without an associated user and created more than 24 hours ago have been deleted.");
    } catch (error) {
      console.error(error);
    }
  });
}
