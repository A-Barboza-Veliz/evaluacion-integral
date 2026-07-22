const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { conectarDB } = require('./config/database');
const cursoRoutes = require('./routes/cursoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10kb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', mensaje: 'API funcionando' });
});

app.use('/api', cursoRoutes);
app.use('/api/auth', authRoutes);

const start = async () => {
  await conectarDB();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start();