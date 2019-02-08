const header = "#EXTM3U";

class M3UGenerator {
  constructor(channels, { groups }) {
    this.whiteList = {
      groups: groups || []
    };
    this.channels = channels;
  }

  async generate() {
    const list = {};
    let m3u = header.slice();
    let i = 0;

    this.whiteList.groups.forEach(group => {
      this.channels[group] && (list[group] = this.channels[group]);
    });

    const groups = Object.keys(list);
    groups.forEach(groupName => {
      const group = list[groupName];
      const channels = Object.keys(group);

      channels.forEach(channelName => {
        group[channelName].forEach(channel => {
          i++;
          m3u = `${m3u}\n#EXTINF:-1 tvg-id="" tvg-name="${
            channel.tvgId
          }" tvg-logo="${channel.icon}" group-title="${
            channel.group
          }" tvg-chno="${i}" channel-id="${i}",${channel.name}\n${
            channel.urlIPTV
          }`;
        });
      });
    });

    return new Promise((resolve, _) => resolve(m3u));
  }
}

exports.M3UGenerator = M3UGenerator;
