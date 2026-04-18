import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Pharmacie = sequelize.define('Pharmacie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: DataTypes.STRING,
  telephone: DataTypes.STRING,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
  regionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // on peut laisser null pour l'instant
    defaultValue: null
  },
}, {
  tableName: 'pharmacie',
  timestamps: true,
});


export default Pharmacie;