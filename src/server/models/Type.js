import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import { Model } from 'objection'

class Type extends BaseModel {
  static tableName = 'types'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: [],
    properties: {
      name: { type: 'string' },
    },
  })

  static relationMappings = {
    menus: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Menu',
      join: {
        from: 'types.id',
        through: {
          from: 'menus_types.type_id',
          to: 'menus_types.menu_id',
        },
        to: 'menus.id',
      },
    },
  }
}

export default Type
