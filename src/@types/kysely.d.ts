declare module "kysely/dist/cjs/schema/create-table-builder" {
  interface CreateTableBuilder<TB extends string, C extends string = never> {
    addIdColumn<CN extends string = "id">(col?: CN): CreateTableBuilder<TB, C | CN>;
  }
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
CreateTableBuilder.prototype.addIdColumn = function (this: CreateTableBuilder<any, any>, col?: string) {
  return this.addColumn(col || "id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`));
};
