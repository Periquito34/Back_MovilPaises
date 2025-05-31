const { City, buildCity } = require('../models/ciudad.model');

// Crear ciudad
const createCity = async (req, res) => {
  try {
    const { country_id, name, population } = req.body;

    if (!country_id || !name) {
      return res.status(400).json({ message: 'El país y el nombre de la ciudad son obligatorios' });
    }

    const cityData = buildCity({ country_id, name, population });

    // Verificar si ya existe una ciudad con el mismo nombre en el país
    const existingCity = await City.findOne({ country_id: cityData.country_id, name: cityData.name });
    if (existingCity) {
      return res.status(400).json({ message: 'Ya existe una ciudad con ese nombre en este país' });
    }

    const city = new City(cityData);
    await city.save();

    return res.status(201).json(city);
  } catch (error) {
    console.error('Error al crear ciudad:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todas las ciudades
const getAllCities = async (req, res) => {
  try {
    // Podemos popular el país para devolver info completa
    const cities = await City.find().populate('country_id', 'name iso');
    return res.json(cities);
  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar ciudad por ID
const updateCity = async (req, res) => {
  try {
    const cityId = req.params.id;
    const { country_id, name, population } = req.body;

    if (!country_id || !name) {
      return res.status(400).json({ message: 'El país y el nombre de la ciudad son obligatorios' });
    }

    const cityData = buildCity({ country_id, name, population });

    // Verificar que no exista otra ciudad con mismo nombre en el país, distinto a esta ciudad
    const existingCity = await City.findOne({
      country_id: cityData.country_id,
      name: cityData.name,
      _id: { $ne: cityId }
    });
    if (existingCity) {
      return res.status(400).json({ message: 'Ya existe otra ciudad con ese nombre en este país' });
    }

    const updatedCity = await City.findByIdAndUpdate(cityId, cityData, { new: true });

    if (!updatedCity) {
      return res.status(404).json({ message: 'Ciudad no encontrada' });
    }

    return res.json(updatedCity);
  } catch (error) {
    console.error('Error al actualizar ciudad:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar ciudad por ID
const deleteCity = async (req, res) => {
  try {
    const cityId = req.params.id;

    const deletedCity = await City.findByIdAndDelete(cityId);

    if (!deletedCity) {
      return res.status(404).json({ message: 'Ciudad no encontrada' });
    }

    return res.json({ message: 'Ciudad eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar ciudad:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createCity,
  getAllCities,
  updateCity,
  deleteCity,
};
