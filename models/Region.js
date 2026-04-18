import { DataTypes } from 'sequelize';
import sequelize  from '../config/database.js';
import Pharmacie from './Pharmacie.js';
import Utilisateur from './Utilisateur.js';
import Garde from './Garde.js';

const Region = sequelize.define('Region', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codePostal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'region',
  timestamps: true,
});


export default Region;