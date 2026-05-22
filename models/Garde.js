import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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


export default Garde;