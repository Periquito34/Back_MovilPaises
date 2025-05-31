const { Schema, model, Types } = require('mongoose');

const CitySchema = new Schema({
  country_id: {
    type: Types.ObjectId,
    ref: 'Country',
    required: [true, 'El país es obligatorio'],
  },
  name: {
    type: String,
    required: [true, 'El nombre de la ciudad es obligatorio'],
  },
  population: {
    type: Number,
    min: [0, 'La población no puede ser negativa'],
    default: 0,
  },
}, {
  timestamps: true,
});

CitySchema.index({ country_id: 1, name: 1 }, { unique: true });

CitySchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id.toString();
  return data;
};

const City = model('City', CitySchema);

const buildCity = (data) => {
  return {
    country_id: data.country_id,
    name: data.name,
    population: data.population >= 0 ? data.population : 0,
  };
};

module.exports = { City, buildCity };
