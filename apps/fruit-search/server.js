require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fruitRoutes = require('./app/routes/fruitRoutes');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/status/ping', (req, res) => {
  res.send({ msg: 'pong' }).status(200);
});

app.use('/api', fruitRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
