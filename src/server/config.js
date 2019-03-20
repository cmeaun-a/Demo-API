import convict from 'convict'
import pick from 'lodash/pick'
import path from 'path'

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  redis: {
    url: {
      doc: 'Redis url',
      format: String,
      default: 'redis://localhost:6379/1',
      env: 'REDIS_URL',
    },
  },
  server: {
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
    sessionSecret: {
      env: 'SESSION_SECRET',
      doc: 'Session secret',
      format: String,
      default: 'the secret is here',
    },
    secure: {
      doc: 'Specify if the server is using https or not.',
      format: Boolean,
      default: false,
    },
    graphql: {
      graphiql: {
        default: true,
      },
    },
  },
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `../../config/${env}.json`))
config.validate()

export const getClientConfig = () => ({
  baseUrl: config.get('server.externalUrl'),
})
export const getClientUser = user => (user ? pick(user, ['id', 'email']) : null)

export default config
