import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import { Model } from 'objection'

class Category extends BaseModel {
  static tableName = 'categories'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['name'],
    properties: {
      name: { type: 'string' },
    },
  })

  static relationMappings = {
    menus: {
      relation: Model.HasManyRelation,
      modelClass: 'Menu',
      join: {
        from: 'categories.id',
        to: 'menus.categoryId',
      },
    },
  }
}

export default Category
