exports.up = function (knex) {
  return (
    knex.schema
      // .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable('profiles', function (table) {
        table.increments();
        table.decimal('income').unsigned();
        table.string('address', 60);
        table.integer('bank_account_id').unsigned().notNullable();
        table.string('color_schema', 60);
        table.string('spending_bar_time_period', 10);
        table.string('net_income_time_period', 10);
        table.string('spending_graph_type', 3);
        table.string('email', 100);
        table.string('saverlife_profile_username').notNullable().unique();
      })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('profiles');
};
