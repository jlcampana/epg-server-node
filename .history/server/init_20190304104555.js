const assert = require('assert')

const checkEnv = () => {
  const { PORT, IPTV_SERVER } = process.env

  assert.ok(IPTV_SERVER, 'IPTV_SERVER env var not set')
  process.env.PORT = PORT || 3000
}

exports.checkEnv = checkEnv
