import bodyParser from 'body-parser'
import compression from 'compression'
import cors         from 'cors'
import express      from 'express'
import logger       from 'winston'
import morgan       from 'morgan'
import semver       from 'semver'

import config       from './config'
import routes       from './routes'

const app = express()

app.set('env', config.env)
app.set('x-powered-by', false)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())
app.use(cors())

app.get('/__ping', (req,res) => {
  res.set('Content-Type', 'text/plain')
  res.send('pong')
})

/* istanbul ignore next */
app.use(morgan('combined', {
  stream: {
    write: message => logger.info(message)
  }
}))

// Mount all this service's routes under the major version path
app.use(`/v${semver.major(config.version)}/${config.name}`, routes)

export default app
