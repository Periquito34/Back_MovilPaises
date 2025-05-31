// controllers/tagController.js
const { Tag, buildTag } = require('../models/tag.model');

// Crear nuevo tag
const createTag = async (req, res) => {
  try {
    const {
      user_id,
      famous_id,
      comentario,
      foto_url,
      created_at,
      lat,
      lng,
    } = req.body;

    const tagData = buildTag({
      user_id,
      famous_id,
      comentario,
      foto_url,
      created_at,
      lat,
      lng,
    });

    const newTag = new Tag(tagData);
    await newTag.save();

    res.status(201).json({ tag: newTag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el tag' });
  }
};

// Obtener todos los tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find()
      .populate('user_id', 'email')
      .populate('famous_id', 'nombre');
    res.status(200).json({ tags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los tags' });
  }
};

// Actualizar un tag
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      famous_id,
      comentario,
      foto_url,
      created_at,
      lat,
      lng,
    } = req.body;

    const updatedTag = await Tag.findByIdAndUpdate(
      id,
      {
        user_id,
        famous_id,
        comentario,
        foto_url,
        created_at,
        lat,
        lng,
      },
      { new: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ error: 'Tag no encontrado' });
    }

    res.status(200).json({ tag: updatedTag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el tag' });
  }
};

// Eliminar un tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTag = await Tag.findByIdAndDelete(id);

    if (!deletedTag) {
      return res.status(404).json({ error: 'Tag no encontrado' });
    }

    res.status(200).json({ message: 'Tag eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el tag' });
  }
};

module.exports = {
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
};
