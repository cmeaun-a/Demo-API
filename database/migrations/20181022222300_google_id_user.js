exports.up = async knex =>
  knex.schema.alterTable('users', table => {
    table.string('google_id')
  })

exports.down = async knex =>
  knex.schema.alterTable('users', table => {
    table.dropColumn('google_id')
  })
