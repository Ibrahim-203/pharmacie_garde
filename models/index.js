import sequelize from '../config/database.js';

import Region from './Region.js';
import Pharmacie from './Pharmacie.js';
import Utilisateur from './Utilisateur.js';
import Garde from './Garde.js';

// Relations

// Region
Region.hasMany(Pharmacie, { foreignKey: 'regionId' });
Region.hasMany(Utilisateur, { foreignKey: 'regionId' });
Region.hasMany(Garde, { foreignKey: 'regionId' });

// Pharmacie
Pharmacie.belongsTo(Region, { foreignKey: 'regionId', as: 'region' });
Pharmacie.hasMany(Garde, { foreignKey: 'pharmacieId' });

// Garde
Garde.belongsTo(Pharmacie, { foreignKey: 'pharmacieId', as: 'pharmacie' });
Garde.belongsTo(Region, { foreignKey: 'regionId', as: 'region' });

// Utilisateur
Utilisateur.belongsTo(Region, { foreignKey: 'regionId' });

export {
  sequelize,
  Region,
  Pharmacie,
  Utilisateur,
  Garde
};