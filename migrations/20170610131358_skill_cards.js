
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('skill_cards', (table)=> {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('description').notNullable().defaultTo('');
    table.string('photo', 'char(1000)').defaultTo('');
    table.string('contact').defaultTo('');
    table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
    table.integer('environment_id').references('environment.id').notNullable().onDelete('cascade');
    table.integer('categories_id').references('categories.id').notNullable().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('skill_cards');
};
