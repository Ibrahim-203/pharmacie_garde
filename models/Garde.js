import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pharmacie from './Pharmacie.js';
import Region from './Region.js';

const Garde = sequelize.define('Garde', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pharmacieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
}, {
    tableName: 'garde',
    timestamps: true,
});

Garde.belongsTo(Pharmacie, {
    foreignKey: 'pharmacieId',
    as: 'pharmacie'
})
Garde.belongsTo(Region, {
    foreignKey: 'regionId',
    as: 'region'
})

export default Garde;