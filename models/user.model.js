const { Schema, model } = require('mongoose');

const AppUserSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'El correo no es válido'],
  },
  password_hash: {
    type: String,
    required: [true, 'La contraseña encriptada es obligatoria'],
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'], // Ajusta según los valores de tu role_enum
    default: 'USER',
    required: true,
  },
   tokenVersion:{ type:Number, default:0 },
  
}, {
  timestamps: true,
});

AppUserSchema.methods.toJSON = function () {
  const { __v, _id, password_hash, ...user } = this.toObject();
  user.id = _id.toString();
  return user;
};

const AppUser = model('AppUser', AppUserSchema);

const buildAppUser = (data) => {
  return {
    nombre: data.nombre,
    email: data.email,
    password_hash: data.password_hash,
    role: data.role ?? 'USER',
  };
};

module.exports = { AppUser, buildAppUser };
