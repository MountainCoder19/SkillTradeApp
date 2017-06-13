
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', (table)=> {
    table.increments('id');
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').notNullable();
    table.bigInteger('phone').defaultTo(0);
    table.string('state').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.integer('zip').defaultTo(0);
    table.string('avatar').defaultTo('');
    table.string('login').notNullable().unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true, true);
      });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('users');
};
