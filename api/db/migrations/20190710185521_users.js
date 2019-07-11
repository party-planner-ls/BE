exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();

    tbl
      .varchar("email", 255)
      .notNullable()
      .unique();

    tbl
      .varchar("password", 255)
      .notNullable()
      .unique();

    tbl
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
    tbl
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
