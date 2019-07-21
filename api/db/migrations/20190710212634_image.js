exports.up = function(knex) {
  return knex.schema.createTable("image", tbl => {
    tbl.increments();

    tbl.string("name");

    tbl.string("data");

    tbl
      .integer("image_list_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("image_list")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("image");
};
