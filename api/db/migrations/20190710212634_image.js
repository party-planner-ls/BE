exports.up = function(knex) {
  return knex.schema.createTable("image", tbl => {
    tbl.increments();

    tbl.string("name");

    tbl.string("data");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("image");
};
