const logger = require('../debug').namespace('Parser')
const { ParserM3U } = require('./m3u')

class ParserM3UEPG extends ParserM3U {
  _parse(res) {
    super._parse(res)
  }
}

exports.ParserM3UEPG = ParserM3UEPG
