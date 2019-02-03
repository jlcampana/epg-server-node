const { Parser } = require('./parser');
const fs = require('fs');

class ParserM3U extends Parser{
  constructor(url, {logger} = {}) {
    super({ logger });

    this.channels = [];
    this.groups = {};
    this.groupedChannels = {};
    this.url = url;
  }

  async remote() {
    const options = {method: 'GET', url: this.url }

    return super.remote(options).then(res => this.parse(res)).catch(_ => []);
  }

  async readFromFile(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, { encoding: 'utf8' }, (err, data) => {
        return err ? reject(err) : resolve(data);
      })
    })
  }

  _map(channels) {
    const result = channels.map(line => {
      try {
        let data = line.split('\r\n');
        const url = data[1].split('/');
        const id = url[url.length - 1].trim().slice();

        data = data[0].split('"').join('');
        data = data.split('group-title=')
        const group = data[1].split(',')[0].trim().slice();

        data = data[0].split('tvg-logo=');

        const icon = data[1].trim().slice();
        data = data[0].split('tvg-name=');

        const name = data[1].trim().slice();
        data = data[0].split('tvg-ID=');

        const int_id = data[1].trim().slice();

        return {id, name, group, icon, int_id}
      } catch (err) {
        this.logger.error(`Unexpected line format: ${line}`);
      }
    });

    return result
  }

  _reduceVOD(channels) {
    return channels.filter(ch => !ch.id.endsWith('.mkv') && !ch.id.endsWith('.avi') )
  }

  _groupChannels(channels) {
    const groups = [];
    const groupedChannels = {};

    channels.forEach(channel => {
      if (!groups.includes(channel.group)) {
        groups.push(channel.group);
        groupedChannels[channel.group] = {}
      }

      groupedChannels[channel.group][channel.name] = channel;
    });

    this.channels = { ...channels };
    this.groups = {...groups};
    this.groupedChannels = { ...groupedChannels };
  }

  async parse(res) {
    let channels = res.split('#EXTINF:-1 ');

    return new Promise((resolve, reject) => {
      if (channels.length && channels.length > 1) {
        channels.shift();
        channels = this._map(channels);
        channels = this._reduceVOD(channels);

        this._groupChannels(channels);

        resolve(this.channels);
      } else {
        reject(new Error('Wrong m3u format'));
      }
    });
  }
}

exports.ParserM3U = ParserM3U;