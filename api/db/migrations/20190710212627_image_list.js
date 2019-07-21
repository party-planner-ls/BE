exports.up = function(knex) {
  return knex.schema.createTable("image_list", tbl => {
    tbl.increments();

    tbl.string("name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("image_list");
};
