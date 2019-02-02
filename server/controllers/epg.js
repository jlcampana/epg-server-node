const json2xml = require('js2xmlparser');
const {Channel, Program, options} = require('../xml')

const get = (req, res, next) => {
  const channel = [];
  const programme = [];

  const chan = new Channel('AZTECA-UNO', 'http://AZTECA-UNO.png', 'Azteca uno', 'ES');
  chan.newName = 'Azteca 1';
  channel.push(chan.xml);

  const prog = new Program('AZTECA-UNO', '20190202', 'Fistro');
  programme.push(prog.xml);

  const root = {
    channel,
    programme
  };
  const xml = json2xml.parse('tv', root, options);

  res.setHeader('Content-Type', 'application/xml');
  res.end(xml);
  return next();
}

exports.get = get