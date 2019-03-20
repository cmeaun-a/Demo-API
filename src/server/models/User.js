import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

class User extends BaseModel {
  static tableName = 'users'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['email'],
    properties: {
      email: { type: 'string' },
      hash: { type: 'string' },
      googleId: { type: ['string', null] },
    },
  })

  static relationMappings = {}
}

export default User
