// TODO: Remove once types for Jest are recognized
/* eslint-disable no-undef */
const portMap = require('../port-map.json');
const twitchProxyPort = portMap['twitch-proxy'];
const { baseUrl } = require('./jest-utils.js');

const BASE_URL = baseUrl(twitchProxyPort);

describe('kraken api', () => {
  it('should return freecodecamp user data', async () => {
    const response = await fetch(
      new URL('/twitch-api/users/freecodecamp', BASE_URL)
    );
    const user = await response.json();
    expect(response.status).toBe(200);
    expect(user.name).toBe('freecodecamp');
    expect(user.display_name).toBe('FreeCodeCamp');
  });

  it('should return freecodecamp channel data', async () => {
    const response = await fetch(
      new URL('/twitch-api/channels/freecodecamp', BASE_URL)
    );
    const channel = await response.json();
    expect(response.status).toBe(200);
    expect(channel.name).toBe('freecodecamp');
    expect(channel.display_name).toBe('FreeCodeCamp');
    expect(channel.url).toBe('https://www.twitch.tv/freecodecamp');
  });

  it("should return esl_sc2's stream data", async () => {
    const response = await fetch(
      new URL('/twitch-api/streams/ESL_SC2', BASE_URL)
    );
    const stream = (await response.json()).stream;
    expect(response.status).toBe(200);
    expect(stream._id).toBe(23366709968);
  });
});
