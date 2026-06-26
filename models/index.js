import sequelize from '../config/database.js';

import Region from './Region.js';
import Pharmacie from './Pharmacie.js';
import Utilisateur from './Utilisateur.js';
import Garde from './Garde.js';
import PharmacieHoraire from './PharmacieHoraire.js';

// Relations

// Region
Region.hasMany(Pharmacie, { foreignKey: 'regionId', as : 'pharmacies' });
Region.hasMany(Utilisateur, { foreignKey: 'regionId', as: 'utilisateurs' });
Region.hasMany(Garde, { foreignKey: 'regionId',  as: 'gardes' });

// Pharmacie
Pharmacie.belongsTo(Region, { foreignKey: 'regionId', as: 'region' });
Pharmacie.hasMany(Garde, { foreignKey: 'pharmacieId', as: 'gardes' });

Pharmacie.hasMany(PharmacieHoraire, {
  foreignKey: 'pharmacieId',
  as: 'horaires'
});
// Pharmacie horaire
PharmacieHoraire.belongsTo(Pharmacie, {
  foreignKey: 'pharmacieId',
  as: 'pharmacie'
});

// Garde
Garde.belongsTo(Pharmacie, { foreignKey: 'pharmacieId', as: 'pharmacie' });
Garde.belongsTo(Region, { foreignKey: 'regionId', as: 'region' });

// Utilisateur
Utilisateur.belongsTo(Region, { foreignKey: 'regionId', as: 'region' });

export {
  sequelize,
  Region,
  Pharmacie,
  Utilisateur,
  Garde
};