const channel = {
  'display-name': [],
  'icon': {
    '@': {
      'src': undefined
    }
  },
  '@': {
    'id': undefined
  }
};

const program = {
  title: 'No disponible',
  desc: 'No disponible',
  date: undefined,
  '@': {
    start: undefined,
    stop: undefined,
    channel: undefined
  }
};

class Channel {
  constructor(id, icon, name, country) {
    this.id = id;
    this.icon = icon;
    this.names = [name];
    this.country = country;
  }

  set newName(name) {
    this.names.push(name);
  }

  get xml() {
    const data = { ...channel, 'display-name': this.names };
    data.icon['@'].src = this.icon;
    data['@'].id = this.id;

    return data;
  }
}

class Program {
  constructor(channel, date, title) {
    this.channel = channel;
    this.date = date;
    this.title = title;
  }

  set description(description) {
    this.description = description;
  }

  set startTime(start) {
    this.start = start;
  }

  set stopTime(stop) {
    this.stop = stop;
  }

  get xml() {
    const data = { ...program, title: this.title, desc: this.description, date: this.date };
    data['@'].channel = this.channel;
    data['@'].start = this.start;
    data['@'].stop = this.stop;

    return data;
  }
}

exports.Channel = Channel;
exports.Program = Program;
exports.options = require('./options');