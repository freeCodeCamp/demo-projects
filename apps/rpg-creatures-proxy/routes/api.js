const router = require('express').Router();
const creatures = require('../data/creatures.json');

const minCreatures = creatures.map(c => {
  return { id: c.id, name: c.name };
});

const creatureCase = creature =>
  creature.charAt(0).toUpperCase() + creature.slice(1).toLowerCase();

router.get('/creatures', (req, res) => res.json(minCreatures));

router.get('/creatures/:creatureNameOrId', (req, res) => {
  const { creatureNameOrId } = req.params;

  const creatureFound = creatures.find(
    c => creatureNameOrId == c.id || c.name === creatureCase(creatureNameOrId)
  );

  return creatureFound
    ? res.json(creatureFound)
    : res.status(404).send('Invalid creature name or ID');
});

module.exports = router;
