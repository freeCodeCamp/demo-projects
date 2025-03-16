require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fruitRoutes = require('./app/routes/fruitRoutes');

const app = express();
app.use(cors());
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api', fruitRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
