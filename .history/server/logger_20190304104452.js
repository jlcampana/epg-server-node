let instance = undefined

class Logger {
  constructor(name) {
    if (instance) {
      return instance
    }

    // init logger
    const config = {
      level: process.env.LOG_LEVEL || 'warn',
      name: name,
      prettyPrint:
        process.env.LOG_PRETTY === 'true' ? { colorize: true } : false
    }

    // pino.destination(1) (STDOUT)
    const pinoDebug = require('pino-debug')
    const pino = require('pino')
    const log = pino(config, pino.destination(1))
    const debugModule = process.env.DEBUG || '*'
    pinoDebug(log, {
      auto: true,
      map: {
        [`${debugModule}:warn`]: 'warn',
        [`${debugModule}:info`]: 'info',
        [`${debugModule}:debug`]: 'debug',
        [`${debugModule}:error`]: 'error'
      }
    })

    this.logger = log
    this.debug = pinoDebug
    instance = this
  }

  warn() {
    this.logger.warn.apply(this.logger, arguments)
  }

  info() {
    this.logger.info.apply(this.logger, arguments)
  }

  debug() {
    this.logger.debug.apply(this.logger, arguments)
  }

  error() {
    this.logger.error.apply(this.logger, arguments)
  }
}

exports.default = Logger
exports.Logger = Logger
