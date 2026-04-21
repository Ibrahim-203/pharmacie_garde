import { DataTypes } from 'sequelize';
import sequelize  from '../config/database.js';

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
    status:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1 // 1 = actif, 0 = inactif
  }
}, {
  tableName: 'region',
  timestamps: true,
});


export default Region;