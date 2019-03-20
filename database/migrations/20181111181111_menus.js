exports.up = async knex =>
  knex.schema.createTable('menus', table => {
    table.bigIncrements('id').primary()
    table.string('restaurant_name').notNull()
    table.string('english_name').notNull()
    table.string('lao_name').notNull()
    table.integer('price').notNull()
    table.text('english_detail')
    table.text('lao_detail')
    table.string('cloudinary_id')
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
    table.boolean('new')
    table.boolean('promo')
    table.boolean('disable')
    table.timestamps(false, true)
  })

exports.down = async knex => knex.schema.dropTableIfExists('menus')
