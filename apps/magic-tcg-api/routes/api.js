const router = require('express').Router();
const cards = require('../data/cards.json').cards;

router.get('/cards', (req, res) => res.json(cards));

router.get('/cards/:cardNameOrId', (req, res) => {
  const { cardNameOrId } = req.params;
  const cardFound = cards.find(
    c => cardNameOrId == c.id || cardNameOrId == c.name
  );

  return cardFound
    ? res.json(cardFound)
    : res.status(404).send('Invalid card name or ID');
});

module.exports = router;
