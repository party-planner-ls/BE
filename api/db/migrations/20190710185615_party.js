exports.up = function(knex) {
  return knex.schema.createTable("party", tbl => {
    tbl.increments();

    tbl.string("name").notNullable();

    tbl.integer("guests").notNullable();

    tbl.string("theme", 255).notNullable();

    tbl.date("date").notNullable();

    tbl.integer("budget").notNullable();

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("party");
};
