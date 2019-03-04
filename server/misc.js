/**
 * @function logger4Namespace
 * @param {string} namespace
 */
const logger4Namespace = namespace => {
  const levels = ['debug', 'trace', 'log', 'info', 'warn', 'error']
  return levels.reduce((acc, level) => {
    acc[level] = debug(`${namespace}:${level}`)
    return acc
  }, {})
}

/**
 * @function getMemory
 */
const memoryUsage = () =>
  Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100

/**
 * @function memoryToHuman
 * @param {Number} memory
 */
const memoryToHuman = memory => Math.round((memory / 1024 / 1024) * 100) / 100

/**
 * @function isObject
 * @param {any} obj
 * @returns boolean
 */
const isObject = obj =>
  typeof obj == 'object' && obj instanceof Object && !(obj instanceof Array)

/**
 * @function hrtime
 * @param {number} hrtime
 * @returns {number} time in seconds
 */
const parseHrtimeToSeconds = hrtime => (hrtime[0] + hrtime[1] / 1e9).toFixed(3)

/**
 * @function isFunction
 * @param {Function} fn - function to check
 * @returns {boolean}
 */
const isFunction = fn => fn && {}.toString.call(fn) === '[object Function]'

/**
 * @function isEmptyObject
 * @param {object} obj object to check if is empty
 * @returns {boolean} true if object is {}
 */
const isEmptyObject = obj => Object.keys(obj).length === 0

/**
 * @function asyncNOOP
 * @param {*} res
 * @returns {Promise}
 */
const asyncNOOP = res => new Promise(resolve => resolve(res))

/**
 * @function namespaceFromRequest
 * @param {Object} req
 * @returns {string} Request's METHOD URL.
 * @example For "www.pepe.com/lala" req => "GET /lala"
 */
const namespaceFromRequest = req =>
  `[${req.method} ${req.originalUrl}]`.toLowerCase()

exports.parseHrtimeToSeconds = parseHrtimeToSeconds
exports.isFunction = isFunction
exports.isObject = isObject
exports.memoryUsage = memoryUsage
exports.isEmptyObject = isEmptyObject
exports.asyncNOOP = asyncNOOP
exports.namespaceFromRequest = namespaceFromRequest
exports.memoryToHuman = memoryToHuman
