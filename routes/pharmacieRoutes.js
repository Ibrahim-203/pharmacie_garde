// routes/pharmacieRoutes.js
import express from 'express';
import {
  getAllPharmacies,
  getPharmacieById,
  createPharmacie,
  updatePharmacie,
  deletePharmacie
} from '../services/pharmacieService.js';
import { verifyToken } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// GET toutes les pharmacies
router.get('/', async (req, res) => {
  try {
    const pharmacies = await getAllPharmacies();
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET pharmacie par id
router.get('/:id', async (req, res) => {
  try {
    const pharmacie = await getPharmacieById(req.params.id);
    if (!pharmacie) return res.status(404).json({ error: 'Pharmacie non trouvée' });
    res.json(pharmacie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer une pharmacie
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename; // enregistrer le nom du fichier
    const newPharmacie = await createPharmacie(data);
    res.status(201).json(newPharmacie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT mettre à jour une pharmacie
router.put('/:id', async (req, res) => {
  try {
    const updatedPharmacie = await updatePharmacie(req.params.id, req.body);
    res.json(updatedPharmacie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE supprimer une pharmacie
router.delete('/:id', async (req, res) => {
  try {
    await deletePharmacie(req.params.id);
    res.json({ message: 'Pharmacie supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;