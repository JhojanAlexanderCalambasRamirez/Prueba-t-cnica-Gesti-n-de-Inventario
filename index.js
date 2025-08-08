const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/ventas', require('./routes/ventasRoutes'));
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
