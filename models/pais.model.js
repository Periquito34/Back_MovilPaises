const { Schema, model } = require('mongoose');

const CountrySchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre del país es obligatorio'],
    unique: true,
  },
  iso: {
    type: String,
    required: [true, 'El código ISO es obligatorio'],
    unique: true,
    minlength: 2,
    maxlength: 2,
  },
});

CountrySchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id.toString();
  return data;
};

const Country = model('Country', CountrySchema);

const buildCountry = (data) => {
  return {
    name: data.name,
    iso: data.iso?.toUpperCase() ?? '',
  };
};

module.exports = { Country, buildCountry };
