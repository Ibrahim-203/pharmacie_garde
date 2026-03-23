// services/pharmacieService.js
import Pharmacie from '../models/Pharmacie.js';

export const getAllPharmacies = async () => {
  return await Pharmacie.findAll();
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