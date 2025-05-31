const { Schema, model, Types } = require('mongoose');

const DishSchema = new Schema({
  city_id: {
    type: Types.ObjectId,
    ref: 'City',
    required: [true, 'La ciudad es obligatorio'],
  },
  name: {
    type: String,
    required: [true, 'El nombre del plato es obligatorio'],
  },
  descripcion: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

DishSchema.index({ country_id: 1, name: 1 }, { unique: true });

DishSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id.toString();
  return data;
};

const Dish = model('Dish', DishSchema);

const buildDish = (data) => {
  return {
    city_id: data.city_id,
    name: data.name,
    descripcion: data.descripcion ?? '',
  };
};

module.exports = { Dish, buildDish };
