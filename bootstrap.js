var logger = require('winston')
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, { colorize: 'all' })

require('babel-register')
require('./index.js')
