exports.up = function(knex) {
  return knex.schema.createTable("item", tbl => {
    tbl.increments();

    tbl.string("name", 255).notNullable();

    tbl.boolean("purchased");

    tbl
      .integer("shopping_list_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("shopping_list")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.integer("price").notNullable();

    tbl.timestamp("purchased_at", true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("shopping_list");
};
