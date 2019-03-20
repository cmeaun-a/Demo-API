/* eslint-disable no-console */

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import cors from 'cors'
import session from 'express-session'
import connectRedis from 'connect-redis'
import graphqlHTTP from 'express-graphql'
import path from 'path'

import * as redis from 'server/services/redis'
import config from 'server/config'
import { connect as connectDatabase } from 'server/services/database'
import auth from 'server/routers/auth'
import schema from 'server/graphql/schema'
import configurePassport from './configurePassport'

configurePassport(passport)

const RedisStore = connectRedis(session)

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({ origin: 'http://localhost:8080', credentials: true }))

app.use(morgan('dev'))
app.use(
  session({
    secret: config.get('server.sessionSecret'),
    store: new RedisStore({ client: redis.connect() }),
    cookie: {
      maxAge: 30000000,
    },
    // Touch is supported by the Redis store.
    // No need to resave, we can avoid concurrency issues.
    resave: false,
    saveUninitialized: false,
  }),
)

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, '../../public/dist')))
app.use('/auth', auth)

app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema,
    context: { user: req.user },
    graphiql: config.get('server.graphql.graphiql'),
  })(req, res)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/dist/index.html'))
})

app.listen(config.get('server.port'), () => {
  connectDatabase()
  console.log(
    `🔥 server is listening on port http://localhost:${config.get(
      'server.port',
    )}`,
  )
})
