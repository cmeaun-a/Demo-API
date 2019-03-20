exports.up = async knex =>
  knex.schema.alterTable('users', table => {
    table.string('facebook_id')
  })

exports.down = async knex =>
  knex.schema.alterTable('users', table => {
    table.dropColumn('facebook_id')
  })
