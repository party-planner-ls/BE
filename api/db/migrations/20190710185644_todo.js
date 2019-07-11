
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo', tbl => {
    tbl.increments()
      .unique()

    tbl.string('name', 255)
      .notNullable()


    tbl
      .integer('todo_list_id')
      .unsigned()
      .references('todo_list')

    tbl
      .boolean('completed')
      .notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('todo')
};

