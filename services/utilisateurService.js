import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

// Lire tous les utilisateurs
export const getAllUtilisateurs = async () => {
  return await Utilisateur.findAll();
};

// Lire un utilisateur par id
export const getUtilisateurById = async (id) => {
  return await Utilisateur.findByPk(id);
};

// Créer un utilisateur
export const createUtilisateur = async (data) => {
  // Hasher le mot de passe avant création
  if (data.motDePasse) {
    const salt = await bcrypt.genSalt(10);
    data.motDePasse = await bcrypt.hash(data.motDePasse, salt);
  }
  return await Utilisateur.create(data);
};

// Mettre à jour un utilisateur
export const updateUtilisateur = async (id, data) => {
  const utilisateur = await Utilisateur.findByPk(id);
  if (!utilisateur) throw new Error('Utilisateur non trouvé');

  if (data.motDePasse) {
    const salt = await bcrypt.genSalt(10);
    data.motDePasse = await bcrypt.hash(data.motDePasse, salt);
  }

  return await utilisateur.update(data);
};

// Supprimer un utilisateur
export const deleteUtilisateur = async (id) => {
  const utilisateur = await Utilisateur.findByPk(id);
  if (!utilisateur) throw new Error('Utilisateur non trouvé');
  return await utilisateur.destroy();
};

export const login = async (email, motDePasse) => {
  const user = await Utilisateur.findOne({ where: { email } });
  if (!user) throw new Error('Utilisateur non trouvé');

  const valid = await bcrypt.compare(motDePasse, user.motDePasse);
  if (!valid) throw new Error('Mot de passe incorrect');

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return { user, token };
};
