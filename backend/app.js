require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
require('./config/db.config');


const app = express();

//* declaration des routes
const userRoutes = require('./routes/user.routes');


//* affiche les requete envoyer au serveur dans la console
app.use(morgan('dev'));

//* intercepte les requete de type json
app.use(express.json());

//* traite les requetes envoyer au serveur
app.use('/api/auth', userRoutes);

module.exports = app;