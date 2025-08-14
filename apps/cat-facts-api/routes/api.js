const router = require('express').Router();
const catFacts = require('../data/cat-facts.json');

router.get('/catfacts', (req, res) => res.json(catFacts));

router.get('/catfacts/random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * catFacts.length);

  return res.json(catFacts[randomNumber]);
});

module.exports = router;
