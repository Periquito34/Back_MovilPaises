const { Famous, buildFamous } = require('../models/famoso.model');

// Crear famoso
const createFamous = async (req, res) => {
  try {
    const {
      nombre,
      categoria,
      ciudad_nacimiento_id,
      ciudad_fama_id,
      biografia,
      avatar_url,
    } = req.body;

    if (!nombre || !categoria || !ciudad_nacimiento_id || !ciudad_fama_id) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const famousData = buildFamous({
      nombre,
      categoria,
      ciudad_nacimiento_id,
      ciudad_fama_id,
      biografia,
      avatar_url,
    });

    const famous = new Famous(famousData);
    await famous.save();

    return res.status(201).json(famous);
  } catch (error) {
    console.error('Error al crear famoso:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los famosos
const getAllFamous = async (req, res) => {
  try {
    const famousList = await Famous.find()
      .populate('ciudad_nacimiento_id', 'name')
      .populate('ciudad_fama_id', 'name');
    return res.json(famousList);
  } catch (error) {
    console.error('Error al obtener famosos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar famoso por ID
const updateFamous = async (req, res) => {
  try {
    const famousId = req.params.id;
    const {
      nombre,
      categoria,
      ciudad_nacimiento_id,
      ciudad_fama_id,
      biografia,
      avatar_url,
    } = req.body;

    const updatedData = buildFamous({
      nombre,
      categoria,
      ciudad_nacimiento_id,
      ciudad_fama_id,
      biografia,
      avatar_url,
    });

    const updatedFamous = await Famous.findByIdAndUpdate(famousId, updatedData, { new: true });

    if (!updatedFamous) {
      return res.status(404).json({ message: 'Famoso no encontrado' });
    }

    return res.json(updatedFamous);
  } catch (error) {
    console.error('Error al actualizar famoso:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar famoso por ID
const deleteFamous = async (req, res) => {
  try {
    const famousId = req.params.id;

    const deletedFamous = await Famous.findByIdAndDelete(famousId);

    if (!deletedFamous) {
      return res.status(404).json({ message: 'Famoso no encontrado' });
    }

    return res.json({ message: 'Famoso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar famoso:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createFamous,
  getAllFamous,
  updateFamous,
  deleteFamous,
};
