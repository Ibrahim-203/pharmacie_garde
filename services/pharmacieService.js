// services/pharmacieService.js
import {Region, Pharmacie} from '../models/index.js';

export const getAllPharmacies = async () => {
  return await Pharmacie.findAll({
    include:[
      { model: Region, as: 'region' }
    ]
  });
};

export const getPharmacieById = async (id) => {
  return await Pharmacie.findByPk(id);
};

export const createPharmacie = async (data) => {
  return await Pharmacie.create(data);
};

export const updatePharmacie = async (id, data) => {
  const pharmacie = await Pharmacie.findByPk(id);
  if (!pharmacie) throw new Error('Pharmacie non trouvée');
  return await pharmacie.update(data);
};

export const deletePharmacie = async (id) => {
  const pharmacie = await Pharmacie.findByPk(id);
  if (!pharmacie) throw new Error('Pharmacie non trouvée');
  return await pharmacie.destroy();
};