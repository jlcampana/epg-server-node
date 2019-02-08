const {Parser} = require('./parser');
const moment = require('moment');
// const { Channel, Program } = require('../xml');

class ParserES extends Parser {
  constructor({logger, numDays}) {
    super({logger});

    this.today = moment();
    this.iniDate = this.today.format(this.dateFormat);
    this.endDate = this.today.add(numDays, 'days').format(this.dateFormat);
    this.url = `http://www.movistarplus.es/programacion-tv/${this.iniDate}/?v=json&verticalScroll=true&isMobile=true`;
  }

  get dateFormat() {
    return 'YYYY-MM-DD';
  }

  iconUrl(channelId) {
    return `http://www.movistarplus.es/recorte/m-NEO/canal/${channelId}`;
  }

  async remote() {
    const method = 'get';
    const url = this.url;
    const res = await super.remote({url, method});


    return this._parseRemote(res.data || []);
  }

  async _parseRemote(res) {
    const channels = Object.keys(res);

    return new Promise((resolve, _) => resolve(res));
  }


}

exports.ParserES = ParserES;