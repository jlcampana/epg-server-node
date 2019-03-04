const MODULE_NAME = '1898team'
const debug = require('debug')
const { parseHrtimeToSeconds, memoryUsage } = require('./misc')

const fnTime = namespace => {
  return {
    start: name => {
      const startTime = process.hrtime()
      debug(`${namespace}:debug`)(`timetrack:${name ? name : ''} start...`)
      return new Object({
        end: () => {
          const endTime = parseHrtimeToSeconds(process.hrtime(startTime))
          debug(`${namespace}:debug`)(
            `timetrack:${
              name ? name : ''
            } finished ${endTime}s | memory usage: ${memoryUsage()}Mb`
          )

          return parseFloat(endTime)
        }
      })
    }
  }
}

function buildLogger(namespace) {
  const levels = ['debug', 'trace', 'log', 'info', 'warn', 'error']
  return levels.reduce(
    (acc, level) => {
      acc[level] = debug(`${namespace}:${level}`)
      return acc
    },
    { timeTrack: fnTime(namespace) }
  )
}

/**
 * A logger instance of debug
 * @constant Logger
 * @type {{debug,trace,log,info,warn,error,events,eventTypes}}
 */
module.exports = Object.assign(buildLogger(MODULE_NAME), {
  namespace(name) {
    return buildLogger(`${MODULE_NAME}:${name}`)
  }
})
