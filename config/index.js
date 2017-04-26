const convict = require('convict')
const fs      = require('fs')
const path    = require('path')
const semver  = require('semver')
const winston = require('winston')

const pkg     = require('../package.json')

const config = convict({
  env: {
    doc: 'Environment the application is running in',
    format: String,
    default: 'development',
    env: 'NODE_ENV'
  },
  logger: {
    level: {
      doc: 'Logging level',
      format: ['debug', 'verbose', 'info', 'warn', 'error'],
      default: 'info',
      env: 'LOG_LEVEL',
      arg: 'log-level'
    },
    morgan: {
      doc: 'Tokens to use for HTTP logging',
      format: String,
      default: `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time`,
      env: 'HTTP_LOG_FORMAT'
    }
  },
  name: {
    doc: 'Sevice Name',
    format: String,
    default: 'bootstrap'
  },
  server: {
    host: {
      doc: 'Hostname/IP for the server',
      default: '0.0.0.0',
      env: 'HOST'
    },
    port: {
      doc: 'Port of the server to listen on',
      default: '8080',
      format: 'port',
      env: 'PORT'
    }
  },
  version: {
    doc: 'Version of the app',
    format: (val) => semver(val) !== null,
    default: pkg.version
  },
})

const env = config.env
const filepath = path.join(__dirname, `config.${env}.json`)
/* istanbul ignore next */
if (fs.existsSync(filepath)) {
  config.loadFile(filepath)
}

config.validate()

winston.level = config.get('logger.level')

module.exports = config.get()
