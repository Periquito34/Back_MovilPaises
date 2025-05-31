const { Schema, model, Types } = require('mongoose');

const SiteSchema = new Schema({
  city_id: {
    type: Types.ObjectId,
    ref: 'City',
    required: [true, 'La ciudad es obligatoria'],
  },
  name: {
    type: String,
    required: [true, 'El nombre del sitio es obligatorio'],
  },
  type: {
    type: String,
    enum: ['RESTAURANTE', 'MUSEO', 'PARQUE', 'OTRO'], // ajusta según los valores válidos de site_type_enum
    required: [true, 'El tipo de sitio es obligatorio'],
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  qr_code: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

SiteSchema.index({ location: '2dsphere' });

SiteSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id.toString();
  return data;
};

const Site = model('Site', SiteSchema);

const buildSite = (data) => {
  return {
    city_id: data.city_id,
    name: data.name,
    type: data.type,
    lat: data.lat,
    lng: data.lng,
    qr_code: data.qr_code,
  };
};

module.exports = { Site, buildSite };
