/* eslint-disable no-console */

import { exec } from 'mz/child_process'
import config from 'server/config'

if (config.get('env') === 'production') {
  throw new Error('Not in production please!')
}

const command = `docker exec -i \`docker-compose ps -q postgres\` psql --username postgres ${config.get(
  'env',
)} < database/structure.sql`

exec(command)
  .then(console.log('Database loaded'))
  .catch(err => {
    setTimeout(() => {
      throw err
    })
  })
