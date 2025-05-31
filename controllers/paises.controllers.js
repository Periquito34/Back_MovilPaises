const { Country, buildCountry } = require('../models/pais.model');

/**
 * Crear un nuevo país
 */
const createPais = async (req, res) => {
  try {
    const countryData = buildCountry(req.body);

    // Verificar si el país ya existe por nombre o iso
    const existingCountry = await Country.findOne({
      $or: [{ name: countryData.name }, { iso: countryData.iso }]
    });

    if (existingCountry) {
      return res.status(400).json({
        message: 'El país ya existe con ese nombre o código ISO'
      });
    }

    const country = new Country(countryData);
    await country.save();

    return res.status(201).json(country);
  } catch (error) {
    console.error('Error al crear el país:', error);
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todos los países
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    return res.json(countries);
  } catch (error) {
    console.error('Error al obtener países:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Editar un país por ID
const updateCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const { name, iso } = req.body;

    if (!name || !iso) {
      return res.status(400).json({ message: 'El nombre y el código ISO son obligatorios' });
    }

    const countryData = buildCountry({ name, iso });

    // Verificar si el nuevo nombre o iso ya están usados por otro país distinto
    const existingCountry = await Country.findOne({
      $or: [{ name: countryData.name }, { iso: countryData.iso }],
      _id: { $ne: countryId }
    });

    if (existingCountry) {
      return res.status(400).json({ message: 'El nombre o código ISO ya están en uso por otro país' });
    }

    const updatedCountry = await Country.findByIdAndUpdate(countryId, countryData, { new: true });

    if (!updatedCountry) {
      return res.status(404).json({ message: 'País no encontrado' });
    }

    return res.json(updatedCountry);
  } catch (error) {
    console.error('Error al actualizar país:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar un país por ID
const deleteCountry = async (req, res) => {
  try {
    const countryId = req.params.id;

    const deletedCountry = await Country.findByIdAndDelete(countryId);

    if (!deletedCountry) {
      return res.status(404).json({ message: 'País no encontrado' });
    }

    return res.json({ message: 'País eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar país:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createPais,
    getAllCountries,
    updateCountry,
    deleteCountry
};
