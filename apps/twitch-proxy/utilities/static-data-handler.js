const db = require('../static-data/helix');

const checkItem = (item, qs) => {
  const keys = Object.keys(qs);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    let query = qs[k];
    query = Array.isArray(query) ? query : [query];
    const found = query.indexOf(item[k]) > -1;
    if (found) return true;
  }
  return false;
};
function staticHandler(type, qs) {
  const resp = db[type];
  if (!resp) return;
  const data = resp.data.filter(i => checkItem(i, qs));
  return { data };
}

module.exports = staticHandler;
