// services/pharmacieService.js
import {Region, Pharmacie} from '../models/index.js';
import fs from 'fs';
import path from 'path';

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

  // 🔹 Suppression de l'image si elle existe
  if (pharmacie.image) {
    const imagePath = path.join('uploads', pharmacie.image);

    // Vérifie si le fichier existe
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // suppression
    }
  }

  // 🔹 Suppression en base
  await pharmacie.destroy();

  return { message: 'Pharmacie supprimée avec succès' };
};