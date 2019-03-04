const { config } = require('dotenv')
config()
const { Logger } = require('./server/logger')
const log = new Logger('epg-server')

const moment = require('moment')
const { ParserM3U } = require('./server/parsers/m3u')
const { EPG } = require('./server/parsers/epg/service')

const {
  whitelist,
  countryGroup,
  removeFromTitle,
  removeChannelContains
} = require('./config.json')
//Injecting variables to process.env from .env file

require('./server/init').checkEnv()

const epg = new EPG()

const test = async () => {
  const iptv = new ParserM3U(process.env.IPTV_SERVER, {
    whitelist,
    countryGroup,
    removeFromTitle,
    removeChannelContains
  })
  // const channels = await iptv.remote();

  try {
    const channels = await iptv.readFromFile('./channels.m3u')
    log.log(iptv.export())

    const now = moment()
    const epgData = await epg.EPG4Country('es', now, 7)
  } catch (err) {
    log.error(err)
  }

  // const generator = new M3UGenerator(iptv.groupedChannels,{groups: ['ESPAÑA']})
  // const m3u = await generator.generate();

  // const es = new ParserES({numDays: 7});
  // const epg = await es.remote();

  // console.log(m3u);
  // console.log(epg);
}

test()
