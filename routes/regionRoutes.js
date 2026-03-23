// routes/regionRoutes.js
import express from 'express';
import {
  getAllRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion
} from '../services/regionService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const regions = await getAllRegions();
    res.json(regions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const region = await getRegionById(req.params.id);
    if (!region) return res.status(404).json({ error: 'Region non trouvée' });
    res.json(region);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newRegion = await createRegion(req.body);
    res.status(201).json(newRegion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedRegion = await updateRegion(req.params.id, req.body);
    res.json(updatedRegion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteRegion(req.params.id);
    res.json({ message: 'Region supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;