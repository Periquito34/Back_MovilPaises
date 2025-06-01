// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnectionMongo } = require('./database/MongoConnection');
const paisRoutes = require('./routes/pais.routes');
const ciudadRoutes = require('./routes/ciudad.routes');
const famosoRoutes = require('./routes/famoso.routes');
const sitioRoutes = require('./routes/sitio.routes');
const platosRoutes = require('./routes/plato.routes');
const menuRoutes = require('./routes/menu.routes');
const tagRoutes = require('./routes/tag.routes');
const userRoutes = require('./routes/user.routes');
const visitaRoutes = require('./routes/visita.routes');
const authRoutes = require('./routes/auth.routes'); 

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use('/api/paises', paisRoutes);
app.use('/api/ciudades', ciudadRoutes);
app.use('/api/famosos', famosoRoutes);
app.use('/api/sitios', sitioRoutes);
app.use('/api/platos', platosRoutes);
app.use('/api/menus', menuRoutes); 
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);
app.use('/api/visitas', visitaRoutes);
app.use('/api/login', authRoutes); 

dbConnectionMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
    process.exit(1);
  });
