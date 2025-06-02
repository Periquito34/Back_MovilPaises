const { Visita, buildVisita } = require('../models/visita.model');

// Crear nueva visita
const createVisita = async (req, res) => {
  try {
    // Extraer la URL de la imagen si fue subida
    let foto_url = null;
    if (req.file && req.file.path) {
      foto_url = req.file.path; // Cloudinary guarda la URL pública en .path
      console.log('Imagen subida:', foto_url);
    }

    // Construir los datos de la visita, añadiendo la URL de la imagen si existe
    const data = buildVisita({
      ...req.body,
      foto_url, // se añade al objeto que se guarda
    });

    const visita = new Visita(data);
    await visita.save();
    res.status(201).json(visita);
  } catch (error) {
    console.error('Error al crear la visita:', error);
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

const getVisitasByUser = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const visitas = await Visita.find({ user_id: userId })
      .populate('user_id', 'nombre email')
      .populate('site_id', 'name type');
    
    if (visitas.length === 0) {
      return res.status(200).json({ message: 'No se encontraron visitas para este usuario', data: [] });
    }
    
    res.json(visitas);
  } catch (error) {
    console.error('Error al obtener visitas por usuario:', error);
    res.status(500).json({ message: 'Error al obtener las visitas del usuario', error: error.message });
  }
};


module.exports = {
  createVisita,
  getAllVisitas,
  updateVisita,
  deleteVisita,
  getVisitasByUser
};
