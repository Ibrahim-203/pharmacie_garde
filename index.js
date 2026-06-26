import express from 'express';
import dotenv from 'dotenv';
import { sequelize, Utilisateur } from './models/index.js';
import regionRoutes from './routes/regionRoutes.js';
import utilisateurRoutes from './routes/utilisateurRoutes.js'
import pharmacieRoutes from './routes/pharmacieRoutes.js'
import gardeRoutes from './routes/gardeRoute.js';
import { createUtilisateur, login } from './services/utilisateurService.js';
import cors from 'cors';
import { verifyToken } from './middlewares/auth.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// verifier si un utilisateur admin existe, sinon le créer
const initializeAdminUser = async () => {
  try {
    const adminUser = await Utilisateur.findOne({ where: { role: 'admin' } });
    if (!adminUser) {
      const adminData = {
        nom: 'Admin',
        prenom: 'Admin',
        email: 'admin@gmail.com',
        motDePasse: 'admin123', //
        role: 'admin',
      };
      await createUtilisateur(adminData);
      console.log('Utilisateur admin créé avec succès !');
    }
  } catch (error) {
    console.error('Erreur lors de la vérification/création de l\'utilisateur admin :', error);
  }
}

// Appel de la fonction pour initialiser l'utilisateur admin
initializeAdminUser();
 
// Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/regions', regionRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/pharmacies', pharmacieRoutes);
app.use('/api/gardes', gardeRoutes);

app.post('/api/login', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const result = await login(email, motDePasse);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
// check session availability
app.get('/api/', verifyToken, (req, res) => {
  res.send('API Pharmacies de Garde est en ligne !');
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