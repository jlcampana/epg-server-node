const json2xml = require('js2xmlparser');
const channelTemplate = require('./channel');
const programTemplate = require('./program')
const options = require('./options')

const channel = [];
const programme = [];

const chan = {
  ...channelTemplate
};
const prog = { ...programTemplate };

chan['@'].id = 'AZTECA-UNO';
chan.icon['@'].src = 'http://AZTECA-UNO.png';
chan['display-name'].push('Azteca 1');
chan['display-name'].push('Azteca 13');
channel.push(chan);
channel.push(chan);
prog.title = "El encantador de perros";
prog.desc = "N/A";
prog.date = "20080711";
prog['@'].channel = 'AZTECA-UNO';
programme.push(prog);
programme.push(prog);
const root = {
  channel,
  programme
};
const xml = json2xml.parse('tv', root, options);
console.log(xml);

