const { Schema, model, Types } = require('mongoose');

const FamousSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del famoso es obligatorio'],
  },
  categoria: {
    type: String,
    enum: ['ARTISTA', 'DEPORTISTA', 'POLITICO', 'CIENTIFICO', 'OTRO'], // Ajusta según tus valores válidos de famous_cat_enum
    required: [true, 'La categoría es obligatoria'],
  },
  ciudad_nacimiento_id: {
    type: Types.ObjectId,
    ref: 'City',
    required: [true, 'La ciudad de nacimiento es obligatoria'],
  },
  ciudad_fama_id: {
    type: Types.ObjectId,
    ref: 'City',
    required: [true, 'La ciudad de fama es obligatoria'],
  },
  biografia: {
    type: String,
    default: '',
  },
  avatar_url: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

FamousSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id.toString();
  return data;
};

const Famous = model('Famous', FamousSchema);

const buildFamous = (data) => {
  return {
    nombre: data.nombre,
    categoria: data.categoria,
    ciudad_nacimiento_id: data.ciudad_nacimiento_id,
    ciudad_fama_id: data.ciudad_fama_id,
    biografia: data.biografia ?? '',
    avatar_url: data.avatar_url ?? '',
  };
};

module.exports = { Famous, buildFamous };
