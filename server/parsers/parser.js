const axios = require('axios');

class Parser{
  async remote({ method, uri, body }) {
    return axios({ method, uri, body }).then(res => res.data);
  }

  async channelList() {
    return new Promise((resolve, _) => resolve([]));
  }

  async programList() {
    return new Promise((resolve, _) => resolve([]));
  }

  formatedDate() {
    return undefined;
  }
}

exports.Parser = Parser;