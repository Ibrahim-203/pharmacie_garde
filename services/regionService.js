// services/regionService.js
import Region from '../models/Region.js';

export const getAllRegions = async () => {
  return await Region.findAll();
};

export const getRegionById = async (id) => {
  return await Region.findByPk(id);
};

export const createRegion = async (data) => {
  return await Region.create(data);
};

export const updateRegion = async (id, data) => {
  const region = await Region.findByPk(id);
  if (!region) throw new Error('Region non trouvée');
  return await region.update(data);
};

export const deleteRegion = async (id) => {
  const region = await Region.findByPk(id);
  if (!region) throw new Error('Region non trouvée');
  return await region.destroy();
};