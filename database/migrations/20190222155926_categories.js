exports.up = async knex =>
  knex.schema
    .createTable('categories', table => {
      table.bigIncrements('id').primary()
      table.timestamps(false, true)
      table.string('name').unique()
    })
    .createTable('types', table => {
      table.bigIncrements('id').primary()
      table.timestamps(false, true)
      table.string('name').unique()
    })
    .alterTable('menus', table => {
      table.dropColumn('category')
      table.dropColumn('type')
      table
        .bigInteger('category_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('categories')
    })
    .createTable('menus_types', table => {
      table.bigIncrements('id').primary()
      table.timestamps(false, true)
      table
        .bigInteger('menu_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('menus')
      table
        .bigInteger('type_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('types')
    })

exports.down = async knex =>
  knex.schema
    .dropTableIfExists('menus_types')
    .alterTable('menus', table => {
      table.enum('type', [
        'meat',
        'beef',
        'pork',
        'seafood',
        'fish',
        'soft drink',
        'alcohol drink',
      ])
      table.enum('category', [
        'set menu',
        'single disk',
        'addition request for set',
        'fried (no rice)',
        'yum salad',
        'soup',
        'drink',
      ])
      table.dropColumn('category_id')
    })
    .dropTableIfExists('types')
    .dropTableIfExists('categories')
