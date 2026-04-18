import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import regionRoutes from './routes/regionRoutes.js';
import utilisateurRoutes from './routes/utilisateurRoutes.js'
import pharmacieRoutes from './routes/pharmacieRoutes.js'
import { login } from './services/utilisateurService.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/regions', regionRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/pharmacies', pharmacieRoutes);

app.post('/api/login', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const result = await login(email, motDePasse);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion PostgreSQL réussie !');

    await sequelize.sync({ alter: true }); 
    console.log('Tables synchronisées avec succès !');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Impossible de démarrer le serveur :', error);
  }
};

startServer();