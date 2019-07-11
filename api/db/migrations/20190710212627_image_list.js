exports.up = function(knex) {
  return knex.schema.createTable("image_list", tbl => {
    tbl.increments();

    tbl
      .integer("party_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("party")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("image_list");
};
