const fs = require('fs');

const getFruits = () => {
  const data = fs.readFileSync('app/fruits.json', 'utf8');
  return JSON.parse(data);
};

const fetchFruits = (req, res) => {
  try {
    const fruits = getFruits();
    const query = req.query.q ? req.query.q.toLowerCase() : '';

    const filteredFruits = fruits.filter(fruit =>
      fruit.name.toLowerCase().includes(query)
    );

    res.json(filteredFruits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load fruits' });
  }
};

module.exports = { fetchFruits };
