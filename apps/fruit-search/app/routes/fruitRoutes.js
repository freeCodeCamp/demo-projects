const express = require('express');
const { fetchFruits } = require('../controllers/fruitController');

const router = express.Router();

router.get('/fruits', fetchFruits);

module.exports = router;
