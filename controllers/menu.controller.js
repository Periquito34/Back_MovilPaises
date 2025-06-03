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

// Buscar sitios por ID de plato
const findSitesByDishId = async (req, res) => {
  try {
    const { dishId } = req.params;
    
    // Validar formato de ID
    if (!dishId || dishId.length !== 24) {
      return res.status(400).json({ message: 'ID de plato no válido' });
    }

    // Buscar menús que contienen ese plato
    const menus = await MenuSitio.find({ dish_id: dishId })
      .populate({
        path: 'site_id',
        select: 'name type lat lng qr_code'
      })
      .populate({
        path: 'dish_id',
        select: 'name description'
      });

    if (menus.length === 0) {
      return res.status(404).json({ 
        message: 'No se encontraron sitios que vendan este plato' 
      });
    }

    // Extraer información relevante
    const dishInfo = menus[0].dish_id;
    const sitesInfo = menus.map(menu => ({
      site: menu.site_id,
      precio: menu.valor_plato
    }));

    return res.json({
      dish: dishInfo,
      sites: sitesInfo
    });
  } catch (error) {
    console.error('Error al buscar sitios por plato:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createMenuSitio,
  getAllMenuSitio,
  updateMenuSitio,
  deleteMenuSitio,
  findSitesByDishId
};
