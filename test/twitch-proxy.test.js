// TODO: Remove once types for Jest are recognized
/* eslint-disable no-undef */
const axios = require('axios');
const portMap = require('../port-map.json');
const twitchProxyPort = portMap['twitch-proxy'];

describe('kraken api', () => {
  it('should return freecodecamp user data', async () => {
    const response = await axios.get(
      `http://localhost:${twitchProxyPort}/twitch-api/users/freecodecamp`
    );
    const user = response.data;
    expect(response.status).toBe(200);
    expect(user.name).toBe('freecodecamp');
    expect(user.display_name).toBe('FreeCodeCamp');
  });

  it('should return freecodecamp channel data', async () => {
    const response = await axios.get(
      `http://localhost:${twitchProxyPort}/twitch-api/channels/freecodecamp`
    );
    const channel = response.data;
    expect(response.status).toBe(200);
    expect(channel.name).toBe('freecodecamp');
    expect(channel.display_name).toBe('FreeCodeCamp');
    expect(channel.url).toBe('https://www.twitch.tv/freecodecamp');
  });

  it("should return esl_sc2's stream data", async () => {
    const response = await axios.get(
      `http://localhost:${twitchProxyPort}/twitch-api/streams/ESL_SC2`
    );
    const stream = response.data.stream;
    expect(response.status).toBe(200);
    expect(stream._id).toBe(23366709968);
  });
});
