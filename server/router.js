const controllers = require('./controllers');

const router = (server) => {
  server.get('/epg', controllers.epg.get);
}

exports.default = router;
exports.router = router;