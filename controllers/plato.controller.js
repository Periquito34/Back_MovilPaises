const { Dish, buildDish } = require('../models/plato.model');

// Crear plato
const createDish = async (req, res) => {
  try {
    const { city_id, name, descripcion } = req.body;

    if (!city_id || !name) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const dishData = buildDish({ city_id, name, descripcion });
    const dish = new Dish(dishData);
    await dish.save();

    return res.status(201).json(dish);
  } catch (error) {
    console.error('Error al crear plato:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los platos
const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('city_id', 'name');
    return res.json(dishes);
  } catch (error) {
    console.error('Error al obtener platos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar plato por ID
const updateDish = async (req, res) => {
  try {
    const dishId = req.params.id;
    const { city_id, name, descripcion } = req.body;

    const updatedData = buildDish({ city_id, name, descripcion });

    const updatedDish = await Dish.findByIdAndUpdate(dishId, updatedData, { new: true });

    if (!updatedDish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }

    return res.json(updatedDish);
  } catch (error) {
    console.error('Error al actualizar plato:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar plato por ID
const deleteDish = async (req, res) => {
  try {
    const dishId = req.params.id;

    const deletedDish = await Dish.findByIdAndDelete(dishId);

    if (!deletedDish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }

    return res.json({ message: 'Plato eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar plato:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createDish,
  getAllDishes,
  updateDish,
  deleteDish,
};
