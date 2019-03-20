exports.up = async knex =>
  knex.schema.createTable('users', table => {
    table.bigIncrements('id').primary()
    table
      .string('email')
      .unique()
      .notNull()
    table.string('hash')
    table.timestamps(false, true)
  })

exports.down = async knex => knex.schema.dropTableIfExists('users')
