exports.up = function(knex) {
  return knex.schema.createTable("shopping_list", tbl => {
    tbl.increments();

    tbl.varchar("name", 255).notNullable();

    tbl.boolean("purchased").defaultTo(false);

    tbl
      .integer("shopping_list_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("shopping_list")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.integer("price").notNullable();

    tbl.timestamp("purchased_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("shopping_list");
};
