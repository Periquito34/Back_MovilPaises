const { MenuSitio, buildMenuSitio } = require('../models/menu.model');

// Crear menú
const createMenuSitio = async (req, res) => {
  try {
    const { site_id, dish_id, valor_plato } = req.body;

    if (!site_id || !dish_id || valor_plato == null) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const menuData = buildMenuSitio({ site_id, dish_id, valor_plato });
    const menuSitio = new MenuSitio(menuData);
    await menuSitio.save();

    return res.status(201).json(menuSitio);
  } catch (error) {
    console.error('Error al crear MenuSitio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los registros del menú
const getAllMenuSitio = async (req, res) => {
  try {
    const data = await MenuSitio.find()
      .populate('site_id', 'name')
      .populate('dish_id', 'name');

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener MenuSitio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar un registro por ID
const updateMenuSitio = async (req, res) => {
  try {
    const id = req.params.id;
    const { site_id, dish_id, valor_plato } = req.body;

    const updateData = buildMenuSitio({ site_id, dish_id, valor_plato });

    const updated = await MenuSitio.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    return res.json(updated);
  } catch (error) {
    console.error('Error al actualizar MenuSitio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar por ID
const deleteMenuSitio = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await MenuSitio.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    return res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar MenuSitio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createMenuSitio,
  getAllMenuSitio,
  updateMenuSitio,
  deleteMenuSitio,
};
