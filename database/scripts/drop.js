/* eslint-disable no-console */

import { exec } from 'mz/child_process'
import config from 'server/config'

if (config.get('env') === 'production') {
  throw new Error('Not in production please!')
}

const command = `docker-compose run postgres dropdb --host postgres --username postgres ${config.get(
  'env',
)} --if-exists`

exec(command)
  .then(console.log('Database droped'))
  .catch(err => {
    setTimeout(() => {
      throw err
    })
  })
