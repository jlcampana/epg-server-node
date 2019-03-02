const { ParserM3U } = require("./server/parsers/m3u");
const { M3UGenerator } = require("./server/generators/m3u");
const { ParserES } = require("./server/parsers/es");
const { config } = require("dotenv");
const {
  whitelist,
  countryGroup,
  removeFromTitle,
  removeChannelContains
} = require("./config.json");
config(); //Injecting variables to process.env from .env file
require("./server/validateConfig.js").checkEnv();

const test = async () => {
  const iptv = new ParserM3U(process.env.IPTV_SERVER, {
    whitelist,
    countryGroup,
    removeFromTitle,
    removeChannelContains
  });
  // const channels = await iptv.remote();

  try {
    const channels = await iptv.readFromFile("./channels.m3u");
    console.log(iptv.export());
  } catch (err) {
    console.error(err);
  }

  // const generator = new M3UGenerator(iptv.groupedChannels,{groups: ["ESPAÑA"]})
  // const m3u = await generator.generate();

  // const es = new ParserES({numDays: 7});
  // const epg = await es.remote();

  // console.log(m3u);
  // console.log(epg);
};

test();
