import NodeCache from 'node-cache';
const cache = new NodeCache({
  stdTTL: process.env.CACHE_TTL_HOURS * 3600, // Convert hours to seconds
  checkperiod: 120
});

export const getCache = key => cache.get(key);

export const setCache = (key, data) => cache.set(key, data);
