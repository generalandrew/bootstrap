import http from 'http'
import logger from 'winston'

import config from './config'

import app from './server'

const startServer = () => {
  return new Promise((res, rej) => {
    let server = http.createServer(app)

    server.on('listening', () => {
      logger.info(`listening on ${config.server.host}:${config.server.port}`)
      return res(server)
    })

    server.on('error', err => {
      return rej(err)
    })

    server.listen(config.server.port, config.server.host)
  })
}

Promise.resolve()
.then(startServer)
.then(() => {
  logger.info(`${config.name} v${config.version} started successfully`)
})
.catch(err => {
  logger.error(err.message, err)
  process.exit(1)
})
