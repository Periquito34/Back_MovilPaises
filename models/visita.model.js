const { Schema, model } = require('mongoose');

const VisitaSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'AppUser',
    required: true,
  },
  site_id: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },
  fecha_visita: {
    type: Date,
    default: Date.now,
    required: true,
  },
  foto_url: {
    type: String,
  },
  lat: {
    type: Number,
    min: -90,
    max: 90,
  },
  lng: {
    type: Number,
    min: -180,
    max: 180,
  },
}, {
  timestamps: true,
});

// Para evitar duplicar la misma visita por user y sitio
VisitaSchema.index({ user_id: 1, site_id: 1 }, { unique: true });

const Visita = model('Visita', VisitaSchema);

const buildVisita = (data) => {
  return {
    user_id: data.user_id,
    site_id: data.site_id,
    fecha_visita: data.fecha_visita ?? new Date(),
    foto_url: data.foto_url,
    lat: data.lat,
    lng: data.lng,
  };
};

module.exports = { Visita, buildVisita };
