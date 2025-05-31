const { Schema, model } = require('mongoose');

const TagSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'AppUser',
    required: true,
  },
  famous_id: {
    type: Schema.Types.ObjectId,
    ref: 'Famous',
    required: true,
  },
  comentario: {
    type: String,
  },
  foto_url: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
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
  timestamps: false,
});

const Tag = model('Tag', TagSchema);

const buildTag = (data) => {
  return {
    user_id: data.user_id,
    famous_id: data.famous_id,
    comentario: data.comentario,
    foto_url: data.foto_url,
    created_at: data.created_at ?? new Date(),
    lat: data.lat,
    lng: data.lng,
  };
};

module.exports = { Tag, buildTag };
