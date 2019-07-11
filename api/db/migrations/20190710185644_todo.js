
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo', tbl => {
    tbl.increments()
      .unique()

    tbl.string('name', 255)
      .notNullable()

    tbl
      .integer("todo_list_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("todo_list")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .boolean('completed')
      .defaultTo(false)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('todo')
};

