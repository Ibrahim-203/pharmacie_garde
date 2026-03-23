import express from 'express';
import {
  getAllUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur
} from '../services/utilisateurService.js';

const router = express.Router();

// GET tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const utilisateurs = await getAllUtilisateurs();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET utilisateur par id
router.get('/:id', async (req, res) => {
  try {
    const utilisateur = await getUtilisateurById(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer un utilisateur
router.post('/', async (req, res) => {
  try {
    const newUtilisateur = await createUtilisateur(req.body);
    res.status(201).json(newUtilisateur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  try {
    const updatedUtilisateur = await updateUtilisateur(req.params.id, req.body);
    res.json(updatedUtilisateur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    await deleteUtilisateur(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;