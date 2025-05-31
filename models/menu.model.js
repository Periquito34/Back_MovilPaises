const { Schema, model, Types } = require('mongoose');

const MenuSitioSchema = new Schema({
  site_id: {
    type: Types.ObjectId,
    ref: 'Site',
    required: true,
  },
  dish_id: {
    type: Types.ObjectId,
    ref: 'Dish',
    required: true,
  },
  valor_plato: {
    type: Number,
    required: true,
    min: [0, 'El valor del plato no puede ser negativo'],
  },
}, {
  timestamps: true,
});

MenuSitioSchema.index({ site_id: 1, dish_id: 1 }, { unique: true });

MenuSitioSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id.toString();
  return data;
};

const MenuSitio = model('MenuSitio', MenuSitioSchema);

const buildMenuSitio = (data) => {
  return {
    site_id: data.site_id,
    dish_id: data.dish_id,
    valor_plato: data.valor_plato,
  };
};

module.exports = { MenuSitio, buildMenuSitio };
