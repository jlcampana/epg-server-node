const { ParserM3U } = require('./server/parsers/m3u');
const { config } = require('dotenv');
config(); //Injecting variables to process.env from .env file
require('./server/validateConfig.js').checkEnv();

const test = async () => {
  const iptv = new ParserM3U(process.env.IPTV_SERVER);
  const res = await iptv.readFromFile('./channels.m3u');
  await iptv.parse(res);
  // await iptv.remote();
  console.log(iptv.groups);
}

test();
