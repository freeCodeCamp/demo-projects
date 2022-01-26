const util = require('util');
const fs = require('fs');

let request = require('request');
request = util.promisify(request);

const { baseApiUrl, twitchCID } = require('../config');

const _users = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
  'test_channel',
];

const reqOpts = {
  method: 'GET',
  headers: {
    'Client-ID': twitchCID,
  },
};
const updateStaticData = async () => {
  try {
    const u = await request(`${baseApiUrl}/helix/users`, {
      ...reqOpts,
      qs: {
        login: _users,
      },
    });
    const users = u.body;
    const user_id = JSON.parse(users).data.map(u => u.id);
    const s = await request(`${baseApiUrl}/helix/streams`, {
      ...reqOpts,
      qs: {
        user_id,
      },
    });
    const streams = s.body;
    const game_ids = JSON.parse(streams).data.map(s => s.game_id);
    const g = await request(`${baseApiUrl}/helix/games`, {
      ...reqOpts,
      qs: {
        id: game_ids,
      },
    });
    const games = g.body;
    fs.writeFileSync(`${__dirname}/helix/users.json`, users);
    fs.writeFileSync(`${__dirname}/helix/streams.json`, streams);
    fs.writeFileSync(`${__dirname}/helix/games.json`, games);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

const getKrakenUserData = async user => {
  const types = ['users', 'streams', 'channels'];
  return Promise.all(
    types.map(type =>
      request(`${baseApiUrl}/kraken/${type}/${user}`, { ...reqOpts })
    )
  ).then(data => {
    const out = {};
    data.forEach((d, i) => {
      out[types[i]] = JSON.parse(d.body);
    });
    return out;
  });
};
const getAllKrakenData = async () =>
  Promise.all(_users.map(getKrakenUserData)).then((data, i) => {
    const out = {};
    data.forEach((d, i) => {
      out[_users[i]] = d;
    });
    return out;
  });
const updateLegacyStaticData = async () => {
  try {
    const _data = await getAllKrakenData();
    fs.writeFileSync(`${__dirname}/kraken.json`, JSON.stringify(_data));
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {
  updateStaticData,
  updateLegacyStaticData,
};
