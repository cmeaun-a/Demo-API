/* eslint-disable import/no-extraneous-dependencies */
import * as database from 'server/services/database'

function useDatabase() {
  beforeAll(async () => {
    const knex = database.connect()
    await knex.migrate.latest()
  })

  afterAll(async () => {
    await database.disconnect()
  })
}

export default useDatabase
