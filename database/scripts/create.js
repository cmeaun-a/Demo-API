/* eslint-disable no-console */

import { exec } from 'mz/child_process'
import config from 'server/config'

if (config.get('env') === 'production') {
  throw new Error('Not in production please!')
}

const command = `docker-compose run postgres createdb --host postgres --username postgres ${config.get(
  'env',
)}`

exec(command)
  .then(console.log('Database created'))
  .catch(err => {
    setTimeout(() => {
      throw err
    })
  })
