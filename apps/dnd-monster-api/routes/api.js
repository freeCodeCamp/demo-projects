const router = require('express').Router();
const monsters = require('../data/5e-SRD-Monsters.json');

router.get('/monsters', (req, res) => res.json(monsters));

router.get('/monsters/:monsterName', (req, res) => {
  const { monsterName } = req.params;
  const monster = monsters.filter(
    x => x.name.toLowerCase() === monsterName.toLowerCase()
  );

  return monster
    ? res.json(monster)
    : res.status(404).send('Monster not found');
});

module.exports = router;
