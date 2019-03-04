const moment = require("moment");
const logger = require("../logger").namespace("EPG Service");
let instance = undefined;

class EPGDataSource {
  constructor(date, duration, resolver) {
    this.date = date;
    this.id = date.format("yyyymmdd");
    this.duration = duration;
    this.channels = [];
    this.resolver = resolver;
  }

  get country() {
    this.resolver.country;
  }

  async fetch() {
    const resolve = new this.resolver(date, this.duration);
    this.channels = await resolve.remote();

    return this.channels;
  }
}

class EPG {
  constructor() {
    if (instance) {
      return instance;
    }

    this.resolvers = {
      es: require("./es").ParserES
    };

    this.datasource = {};
    instance = this;
  }

  async EPG4Country(countryCode, date, numdays) {
    const code = countryCode.toLowerCase();
    const ds = this.datasource[code];

    if (ds && ds.id === date.format("yyyymmdd")) {
      return ds;
    } else {
      const resolver = this.resolvers[code];

      if (!resolver) {
        throw new Error(`No resolver for country code ${countryCode} 
        `);
      }

      this.datasource[code] = new EPGDataSource(date, numdays, resolver);

      return await this.datasource[code].fetch();
    }
  }
}

exports.EPG = EPG;
