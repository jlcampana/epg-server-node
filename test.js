const { ParserM3U } = require('./server/parsers/m3u');
const {M3UGenerator} = require('./server/generators/m3u');
const { config } = require('dotenv');
const { whitelist, countryGroup, removeFromTitle, removeChannelContains } = require('./config.json');
config(); //Injecting variables to process.env from .env file
require('./server/validateConfig.js').checkEnv();

const test = async () => {
  const iptv = new ParserM3U(process.env.IPTV_SERVER, {whitelist,countryGroup,removeFromTitle, removeChannelContains});
  // await iptv.remote();

  const res = await iptv.readFromFile('./channels.m3u');
  await iptv.parse(res);

  const generator = new M3UGenerator(iptv.groupedChannels,{groups: ["ESPAÑA"]})
  const m3u = await generator.generate();

  console.log(m3u);
}

test();
