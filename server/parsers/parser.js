class Parser{
  async remote() {
    return new Promise((resolve, _) => resolve([]));
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