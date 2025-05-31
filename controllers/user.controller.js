const { AppUser, buildAppUser } = require('../models/user.model');

// Crear usuario
const createAppUser = async (req, res) => {
  try {
    const data = buildAppUser(req.body);
    const user = new AppUser(data);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los usuarios
const getAllAppUsers = async (req, res) => {
  try {
    const users = await AppUser.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario por ID
const updateAppUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await AppUser.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar usuario por ID
const deleteAppUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AppUser.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAppUser,
  getAllAppUsers,
  updateAppUser,
  deleteAppUser,
};
