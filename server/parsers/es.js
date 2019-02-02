const Parser = require('./parser');
const { Channel, Program } = require('../xml');

class ParserES extends Parser {
  constructor(date) {
    this.date = formatedDate(date); //formated date
    this.url = `http://www.movistarplus.es/programacion-tv/${this.date}/?v=json&verticalScroll=true&isMobile=true`;
  }

  formatedDate(date) {
    return 'yyyy-MM-dd';
  }

  iconUrl(channelId) {
    return `http://www.movistarplus.es/recorte/m-NEO/canal/${channelId}`;
  }

  async remote() {
    return new Promise((resolve, _) => resolve([]));
  }

  async _parseRemote(res) {
    return new Promise((resolve, _) => resolve(res));
  }

  async channelList() {
    return new Promise((resolve, _) => resolve([]));
  }

  async programList() {
    return new Promise((resolve, _) => resolve([]));
  }
}

exports.ParserES = ParserES;