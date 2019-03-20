import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import { Model } from 'objection'

class Menu extends BaseModel {
  static tableName = 'menus'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: [],
    properties: {
      restaurantName: { type: 'string' },
      englishName: { type: 'string' },
      laoName: { type: 'string' },
      price: { type: 'int' },
      englishDetail: { type: ['string', null] },
      laoDetail: { type: ['string', null] },
      cloudinaryId: {
        type: ['string', null],
        default:
          'https://res.cloudinary.com/djxpw90hu/image/upload/v1542491650/default.jpg',
      },
      new: { type: ['boolean'], default: false },
      promo: { type: ['boolean'], default: false },
    },
  })

  static relationMappings = {
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Category',
      join: {
        from: 'menus.categoryId',
        to: 'categories.id',
      },
    },
    types: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Type',
      join: {
        from: 'menus.id',
        through: {
          from: 'menus_types.menu_id',
          to: 'menus_types.type_id',
        },
        to: 'types.id',
      },
    },
  }
}

export default Menu
