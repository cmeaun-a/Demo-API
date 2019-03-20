import Menu from 'server/models/Menu'
import MenuType from 'server/models/MenuType'
import { mustBeLogged } from 'server/graphql/auth'

export const schema = /* GraphQL */ `
  type Menu {
    id: ID!
    restaurantName: String
    englishName: String
    laoName: String
    price: Int
    englishDetail: String
    laoDetail: String
    cloudinaryId: String
    types: [Type!]
    category: Category
    new: Boolean
    promo: Boolean
  }

  input MenuInput {
    englishName: String!
    laoName: String!
    price: Int!
    englishDetail: String
    laoDetail: String
    cloudinaryId: String
    categoryId: ID
    typeIds: [ID!]
    new: Boolean
    promo: Boolean
  }

  input MenuFilter {
    englishName: String
    laoName: String
    englishDetail: String
    laoDetail: String
    cloudinaryId: String
    new: Boolean
    promo: Boolean
  }

  extend type Query {
    menus(restaurantName: String!, filter: MenuFilter): [Menu!]!
  }

  extend type Mutation {
    addMenu(menu: MenuInput!, restaurantName: String!): Menu!
    updateMenu(menuId: ID!, menu: MenuInput!): Menu!
    deleteMenu(menuId: ID!): Boolean
  }
`

export const resolvers = {
  Query: {
    menus: async (object, { restaurantName, filter = {} }) =>
      Menu.query()
        .where({ restaurantName })
        .where(builder => {
          Object.entries(filter)
            .filter(entry => entry[0] !== 'new' && entry[0] !== 'promo')
            .forEach(([key, value]) => {
              if (value) builder.where(key, 'ilike', `%${value}%`)
              return builder
            })
          const booleanFilter = { new: filter.new, promo: filter.promo }
          Object.entries(booleanFilter).forEach(([key, value]) => {
            if (value !== undefined && value !== null)
              builder.where({ [key]: value })
            return builder
          })
        })
        .orderBy('createdAt', 'desc'),
  },
  Mutation: {
    addMenu: mustBeLogged(
      async (object, { menu: { typeIds, ...menu }, restaurantName }) => {
        const createdMenu = await Menu.query().insertAndFetch({
          ...menu,
          restaurantName,
        })

        if (typeIds) {
          await Promise.all(
            typeIds.map(typeId =>
              MenuType.query().insert({
                typeId,
                menuId: createdMenu.id,
              }),
            ),
          )
        }
        return createdMenu
      },
    ),
    updateMenu: mustBeLogged(
      async (object, { menuId, menu: { typeIds, ...menu } }) => {
        const updatedMenu = await Menu.query().patchAndFetchById(menuId, menu)

        await MenuType.query()
          .delete()
          .where({ menuId: updatedMenu.id })

        if (typeIds) {
          await Promise.all(
            typeIds.map(typeId =>
              MenuType.query().insert({
                typeId,
                menuId: updatedMenu.id,
              }),
            ),
          )
        }

        return updatedMenu
      },
    ),
    deleteMenu: mustBeLogged(async (object, { menuId }) => {
      await MenuType.query()
        .delete()
        .where({ menuId })

      await Menu.query().deleteById(menuId)
    }),
  },
  Menu: {
    types: async object => object.$relatedQuery('types'),
    category: async object => object.$relatedQuery('category'),
  },
}
