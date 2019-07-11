
exports.up =async function(knex) {
  await knex.schema.createTable('entertainment', function(tbl) {

    tbl.increments()
      .unique()

    tbl
      .string('name', 255)
      .notNullable()

    tbl
      .string('todo_list_id', 255)
      .references('todo_list')
      .notNullable()

    tbl
      .integer('price')
      .notNullable()

    tbl
      .boolean('completed')
      .notNullable()

  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('entertainment')
};


