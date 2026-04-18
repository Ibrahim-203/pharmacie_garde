// routes/gardeRoutes.js
import express from 'express';
import {
  getAllGardes,
  getGardeById,
  createGarde,
  updateGarde,
  deleteGarde,
  getGardeToday
} from '../services/gardeService.js';

import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// 🔹 GET toutes les gardes
router.get('/', async (req, res) => {
  try {
    const gardes = await getAllGardes();
    res.json(gardes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 GET garde aujourd’hui
router.get('/today', async (req, res) => {
  try {
    const garde = await getGardeToday();
    if (!garde) {
      return res.status(404).json({ message: 'Aucune pharmacie de garde aujourd’hui' });
    }
    res.json(garde);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 GET par ID
router.get('/:id', async (req, res) => {
  try {
    const garde = await getGardeById(req.params.id);
    if (!garde) return res.status(404).json({ error: 'Garde non trouvée' });
    res.json(garde);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 POST créer (protégé)
router.post('/', verifyToken, async (req, res) => {
  try {
    const garde = await createGarde(req.body);
    res.status(201).json(garde);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 PUT
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const garde = await updateGarde(req.params.id, req.body);
    res.json(garde);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await deleteGarde(req.params.id);
    res.json({ message: 'Garde supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;