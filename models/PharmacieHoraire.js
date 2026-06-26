import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PharmacieHoraire = sequelize.define('PharmacieHoraire', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  pharmacieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // 🔹 Jour de la semaine (0 = lundi ... 6 = dimanche)
  dayOfWeek: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // 🔥 MATIN
  morningOpen: {
    type: DataTypes.TIME,
    allowNull: true
  },

  morningClose: {
    type: DataTypes.TIME,
    allowNull: true
  },

  // 🔥 APRÈS-MIDI
  afternoonOpen: {
    type: DataTypes.TIME,
    allowNull: true
  },

  afternoonClose: {
    type: DataTypes.TIME,
    allowNull: true
  },

  // 🔹 Si la pharmacie ferme totalement ce jour
  isClosed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'pharmacie_horaires',
  timestamps: true
});



export default PharmacieHoraire;