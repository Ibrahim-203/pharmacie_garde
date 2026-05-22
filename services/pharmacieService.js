// services/pharmacieService.js
import { Region, Pharmacie } from '../models/index.js';
import fs from 'fs/promises';
import path from 'path';

export const getAllPharmacies = async () => {
  return await Pharmacie.findAll({
    include: [
      { model: Region, as: 'region' }
    ]
  });
};

export const getPharmacieById = async (id) => {
  return await Pharmacie.findByPk(id,{
    include: [
      { model: Region, as: 'region' }
    ]
  });
};

export const createPharmacie = async (data) => {
  return await Pharmacie.create(data);
};

export const updatePharmacie = async (id, data) => {
  const pharmacie = await Pharmacie.findByPk(id);
  if (!pharmacie) throw new Error('Pharmacie non trouvée');

  // 🔹 Si une nouvelle image est envoyée
  if (data.image && pharmacie.image) {
    try {
      const oldImagePath = path.join('uploads', pharmacie.image);
      await fs.unlink(oldImagePath);
    } catch (err) {
      console.warn("Ancienne image introuvable ou déjà supprimée");
    }
  }

  // 🔹 Update des données
  return await pharmacie.update(data);
};

export const deletePharmacie = async (id) => {
  const pharmacie = await Pharmacie.findByPk(id);
  if (!pharmacie) throw new Error('Pharmacie non trouvée');

  // 🔹 Suppression de l'image si elle existe
  if (pharmacie.image) {
    try {
      const imagePath = path.join('uploads', pharmacie.image);
      await fs.unlink(imagePath);
    } catch (err) {
      console.warn("Image non trouvée ou déjà supprimée");
    }
  }

  // 🔹 Suppression en base
  await pharmacie.destroy();

  return { message: 'Pharmacie supprimée avec succès' };
};

export const getPharmaciesByRegion = async (regionId) => {
  return await Pharmacie.findAll({
    where: { regionId },
    include: [
      {
        model: Region,
        as: 'region'
      }
    ]
  });
};