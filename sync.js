// sync.js
import sequelize from './config/database.js';
import Region from './models/Region.js';
import Pharmacie from './models/Pharmacie.js';
import Utilisateur from './models/Utilisateur.js';

// Définir les relations
Pharmacie.belongsTo(Region, { foreignKey: 'regionId' });
Utilisateur.belongsTo(Region, { foreignKey: 'regionId' });

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion PostgreSQL réussie !');

    // Crée les tables (force: true => supprime les anciennes)
    await sequelize.sync({ force: true });
    console.log('Tables créées avec succès !');
  } catch (error) {
    console.error('Erreur :', error);
  } finally {
    await sequelize.close();
  }
};

init();