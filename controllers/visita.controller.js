const { Visita, buildVisita } = require('../models/visita.model');

// Crear nueva visita
const createVisita = async (req, res) => {
  try {
    const data = buildVisita(req.body);
    const visita = new Visita(data);
    await visita.save();
    res.status(201).json(visita);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la visita', error: error.message });
  }
};

// Obtener todas las visitas
const getAllVisitas = async (req, res) => {
  try {
    const visitas = await Visita.find()
      .populate('user_id', 'nombre email')
      .populate('site_id', 'name');
    res.json(visitas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las visitas', error: error.message });
  }
};

// Actualizar una visita
const updateVisita = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Visita.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Visita no encontrada' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la visita', error: error.message });
  }
};

// Eliminar una visita
const deleteVisita = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Visita.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Visita no encontrada' });
    res.json({ message: 'Visita eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la visita', error: error.message });
  }
};

module.exports = {
  createVisita,
  getAllVisitas,
  updateVisita,
  deleteVisita,
};
