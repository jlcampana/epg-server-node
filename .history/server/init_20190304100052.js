const assert = require("assert");

const checkEnv = () => {
  const { PORT, IPTV_SERVER } = process.env;

  assert.ok(IPTV_SERVER, "IPTV_SERVER env var not set");
  process.env.PORT = PORT || 3000;
};

let pinoDebug;
if (process.env.NODE_ENV !== "test") {
  // eslint-disable-next-line global-require
  pinoDebug = require("pino-debug");
}
const pino = require("pino");

// init logger
const config = {
  level: process.env.LOG_LEVEL || "warn",
  name: "epg-server-node",
  prettyPrint:
    process.env.LOG_PRETTY !== "false" ? { translateTime: true } : false
};

// pino.destination(1) (STDOUT)
const logger = pino(config, pino.destination(1));
// Set the logger to the myaxa assets
if (process.env.NODE_ENV !== "test") {
  const debugModule = process.env.DEBUG || "*";
  const modules = debugModule.split(",");
  const map = modules.reduce((acc, mod) => {
    acc[`${mod}:warn`] = "warn";
    acc[`${mod}:info`] = "info";
    acc[`${mod}:debug`] = "debug";
    acc[`${mod}:error`] = "error";

    return acc;
  }, {});
  pinoDebug(logger, {
    auto: true,
    map
  });
}

exports.logger = logger;
exports.checkEnv = checkEnv;
