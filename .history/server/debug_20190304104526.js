const debug = require("debug");

function buildLogger(namespace) {
  const levels = ["debug", "trace", "log", "info", "warn", "error"];
  return levels.reduce((acc, level) => {
    acc[level] = debug(`${namespace}:${level}`);
    return acc;
  }, {});
}

/**
 * A logger instance of debug
 * @constant Logger
 * @type {{debug,trace,log,info,warn,error,events,eventTypes}}
 */
module.exports = Object.assign(buildLogger("epg-server-node"), {
  namespace(name) {
    return buildLogger(`epg-server-node:${name}`);
  }
});
