// services/gardeService.js
import { Garde, Pharmacie, Region } from '../models/index.js';
import { Op } from 'sequelize';

// 🔹 Toutes les gardes
export const getAllGardes = async () => {
  return await Garde.findAll({
    include: [
      { model: Pharmacie, as: 'pharmacie' },
      { model: Region, as: 'region' }
    ]
  });
};

// 🔹 Garde par ID
export const getGardeById = async (id) => {
  return await Garde.findByPk(id, {
    include: [
      { model: Pharmacie, as: 'pharmacie' },
      { model: Region, as: 'region' }
    ]
  });
};

// 🔹 Créer une garde
export const createGarde = async (data) => {
  return await Garde.create(data);
};

// 🔹 Mettre à jour
export const updateGarde = async (id, data) => {
  const garde = await Garde.findByPk(id);
  if (!garde) throw new Error('Garde non trouvée');
  return await garde.update(data);
};

// 🔹 Supprimer
export const deleteGarde = async (id) => {
  const garde = await Garde.findByPk(id);
  if (!garde) throw new Error('Garde non trouvée');
  return await garde.destroy();
};


export const getGardeToday = async () => {
  const today = new Date();

  return await Garde.findOne({
    where: {
      dateDebut: { [Op.lte]: today },
      dateFin: { [Op.gte]: today }
    },
    include: [
      { model: Pharmacie, as: 'pharmacie' },
      { model: Region, as: 'region' }
    ]
  });
};