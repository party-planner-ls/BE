
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo_list', tbl => {
    tbl
      .increments()
      .unique()

    tbl
      .string('party_id')
      .references('party')
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todo_list')
};
