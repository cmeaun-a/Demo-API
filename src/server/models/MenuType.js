import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import { Model } from 'objection'

class Type extends BaseModel {
  static tableName = 'menus_types'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: [],
    properties: {},
  })

  static relationMappings = {
    type: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Type',
      join: {
        from: 'menus_types.typeId',
        to: 'types.id',
      },
    },
    menu: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Menu',
      join: {
        from: 'menus_types.menuId',
        to: 'menus.id',
      },
    },
  }
}

export default Type
