/* eslint-disable no-console */

import { join } from 'path'
import { exec } from 'mz/child_process'
import { appendFile, readdir } from 'mz/fs'
import config from 'server/config'

if (config.get('env') !== 'development') {
  throw new Error('You should only dump in development')
}

const getMigrationInserts = async () => {
  const migrations = await readdir(join(__dirname, '../migrations'))
  return migrations
    .map(
      migration =>
        `INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('${migration}', 1, NOW());\n`,
    )
    .join('')
}

exec(
  `docker-compose exec -T postgres pg_dump --schema-only --username postgres ${config.get(
    'env',
  )} > database/structure.sql`,
)
  .then(async () => {
    const migrationInserts = await getMigrationInserts()
    return appendFile(
      'database/structure.sql',
      `-- Knex migrations\n\n${migrationInserts}`,
    )
  })
  .then(console.log('Database dumped'))
  .catch(err => {
    setTimeout(() => {
      throw err
    })
  })
