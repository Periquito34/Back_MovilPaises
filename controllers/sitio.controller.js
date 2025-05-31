const { Site, buildSite } = require('../models/sitio.model');

// Crear sitio
const createSite = async (req, res) => {
  try {
    const { city_id, name, type, lat, lng, qr_code } = req.body;

    if (!city_id || !name || !type || lat == null || lng == null || !qr_code) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const siteData = buildSite({ city_id, name, type, lat, lng, qr_code });

    const site = new Site(siteData);
    await site.save();

    return res.status(201).json(site);
  } catch (error) {
    console.error('Error al crear sitio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los sitios
const getAllSites = async (req, res) => {
  try {
    const sites = await Site.find().populate('city_id', 'name');
    return res.json(sites);
  } catch (error) {
    console.error('Error al obtener sitios:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar sitio por ID
const updateSite = async (req, res) => {
  try {
    const siteId = req.params.id;
    const { city_id, name, type, lat, lng, qr_code } = req.body;

    const updatedData = buildSite({ city_id, name, type, lat, lng, qr_code });

    const updatedSite = await Site.findByIdAndUpdate(siteId, updatedData, { new: true });

    if (!updatedSite) {
      return res.status(404).json({ message: 'Sitio no encontrado' });
    }

    return res.json(updatedSite);
  } catch (error) {
    console.error('Error al actualizar sitio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar sitio por ID
const deleteSite = async (req, res) => {
  try {
    const siteId = req.params.id;

    const deletedSite = await Site.findByIdAndDelete(siteId);

    if (!deletedSite) {
      return res.status(404).json({ message: 'Sitio no encontrado' });
    }

    return res.json({ message: 'Sitio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar sitio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createSite,
  getAllSites,
  updateSite,
  deleteSite,
};
