
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo_list', tbl => {
    tbl
      .increments()
      .unique()
    
    tbl
      .integer("party_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("party")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todo_list')
};
