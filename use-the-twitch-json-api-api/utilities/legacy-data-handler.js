const streamers = require('../static-data/kraken.json');

function getStreamersData(type, user) {
  if (!streamers[user]) return undefined;
  return streamers[user][type];
}

module.exports = getStreamersData;
