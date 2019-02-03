const axios = require('axios');

class Parser {
  constructor({
    logger
  } = {}) {
    this.logger = logger || console;
  }

  async remote({
    method,
    url,
    headers,
    body
  }) {
    this.logger.debug(`FETCHING ${method} ${url}`);

    return axios({
      method,
      url,
      body
    }).then(res => {
      this.logger.debug(`END OK ${method} ${url}`);

      return res.data;
    }).catch(err => {
      this.logger.error(`END KO ${method} ${url} error: ${JSON.stringify(err)}`);

      return err;
    });
  }

  setLogger(logger) {
    this.logger = logger;
  }
}

exports.Parser = Parser;