const axios = require("axios");
const logger = require("./logger").namespace("Parser");
class Parser {
  async remote({ method, url, headers, body }) {
    logger.debug(`FETCHING ${method} ${url}`);

    return axios({
      method,
      url,
      body
    })
      .then(res => {
        logger.debug(`END OK ${method} ${url}`);

        return res.data;
      })
      .catch(err => {
        logger.error(`END KO ${method} ${url} error: ${JSON.stringify(err)}`);

        return err;
      });
  }

  setLogger(logger) {
    logger = logger;
  }
}

exports.Parser = Parser;
